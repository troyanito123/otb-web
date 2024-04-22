import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as FinesActions from 'src/app/state/actions/fines.actions';
import { AttendencesActions } from 'src/app/state/actions/attendences.actions';
import { MeetingsActions } from 'src/app/state/actions/meetings.actions';

import { User } from 'src/app/models/user.model';
import { Fine } from 'src/app/models/fine.model';
import { Meeting } from 'src/app/models/meeting.model';
import { Attendence } from 'src/app/models/attendence.model';
import { PreFinesPaid } from 'src/app/models/pre-fines-paid.model';
import { PreFinesPaidPipe } from 'src/app/pipes/pre-fines-paid.pipe';
import * as PreFinesActions from 'src/app/state/actions/pre-fine.action';
import * as TransactionsActions from 'src/app/state/actions/transactions.action';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Transaction } from 'src/app/models/transaction.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { userFeature } from '@state/reducers/user.reducer';

@Component({
  selector: 'app-user-fines',
  templateUrl: './user-fines.component.html',
  styleUrls: ['./user-fines.component.scss'],
})
export class UserFinesComponent implements OnInit, OnDestroy {
  public user!: User | null;
  private userSubs!: Subscription;

  public fines: Fine[] = [];
  private finesSubs!: Subscription;

  public meetings: Meeting[] = [];
  private meetingsSubs!: Subscription;

  public attendences: Attendence[] = [];
  private attendencesSub!: Subscription;

  public dataSource: PreFinesPaid[] = [];

  public preFinesPaid: PreFinesPaid[] = [];
  public totalFinesPaid = 0;
  private preFinesPaidSubs!: Subscription;

  displayedColumns = [
    'date',
    'meeting',
    'attendence',
    'fine',
    'finePaid',
    'option',
  ];

  displayedColumnsPrePaid = ['meetingx', 'finex', 'optionx'];

  inputDate = new UntypedFormControl(new Date().toISOString(), [Validators.required]);

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(MeetingsActions.load());
    this.subscribeStore();
  }

  ngOnDestroy(): void {
    this.store.dispatch(FinesActions.clean());
    this.store.dispatch(PreFinesActions.clean());
    this.unsubscribeStore();
  }

  public addToPrePaid(preFine: PreFinesPaid) {
    this.store.dispatch(PreFinesActions.addFinePaid({ preFine }));
  }

  public removeToPrePaid(preFine: PreFinesPaid) {
    this.store.dispatch(PreFinesActions.substractFinePaid({ preFine }));
  }

  public confirmPaid() {
    if (!this.preFinesPaid.length) {
      this.matDialog.open(AlertComponent, {
        data: {
          title: 'Error al pagar multas',
          content: 'Tiene que añadir por lo menos una multa',
        },
      });
      return;
    }
    const meetingIds = JSON.stringify(
      this.preFinesPaid.map((p) => p.meetingId)
    );

    this.store.dispatch(
      FinesActions.createMany({
        userId: this.user!.id,
        date: new Date(this.inputDate.value!),
        meetingIds,
      })
    );
  }

  private subscribeStore() {
    this.userSubs = this.store.select(userFeature.selectUser).subscribe((user) => {
      this.user = user;
      this.store.dispatch(FinesActions.loadByUser({ id: user!.id }));
      this.store.dispatch(AttendencesActions.loadByUser({ userId: user!.id }));
    });

    this.finesSubs = this.store
      .select('fines')
      .subscribe(({ fines, error, saved }) => {
        this.fines = fines;
        this.dataSource = new PreFinesPaidPipe().transform(
          this.meetings,
          this.attendences,
          this.fines
        );
        if (error) this.handledError(error);

        if (saved) {
          this.store.dispatch(
            TransactionsActions.addTransaction({
              transactions: this.generateTransactions(),
            })
          );
          this.store.dispatch(PreFinesActions.clean());
          this.router.navigate([
            'private/users',
            this.user!.id,
            'receipt-view',
          ]);
        }
      });

    this.meetingsSubs = this.store
      .select('meetings')
      .subscribe(({ meetings, error }) => {
        this.meetings = meetings;
        this.dataSource = new PreFinesPaidPipe().transform(
          this.meetings,
          this.attendences,
          this.fines
        );
        if (error) this.handledError(error);
      });

    this.attendencesSub = this.store
      .select('attendences')
      .subscribe(({ attendences, error }) => {
        this.attendences = attendences;
        this.dataSource = new PreFinesPaidPipe().transform(
          this.meetings,
          this.attendences,
          this.fines
        );
        if (error) this.handledError(error);
      });

    this.preFinesPaidSubs = this.store
      .select('preFines')
      .subscribe(({ preFines, total }) => {
        this.preFinesPaid = preFines;
        this.totalFinesPaid = total;
      });
  }

  private unsubscribeStore() {
    this.userSubs?.unsubscribe();
    this.finesSubs?.unsubscribe();
    this.meetingsSubs?.unsubscribe();
    this.attendencesSub?.unsubscribe();
    this.preFinesPaidSubs?.unsubscribe();
  }

  private handledError(error: any) {
    console.log({ error });
  }

  private generateTransactions() {
    return this.preFinesPaid.map(
      (p) =>
        new Transaction(
          `Multa de ${p.meetingName}`,
          p.fine,
          new Date(this.inputDate.value!)
        )
    );
  }
}
