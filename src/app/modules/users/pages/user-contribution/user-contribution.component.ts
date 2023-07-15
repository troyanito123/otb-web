import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userFeature } from '@state/reducers/user.reducer';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { ContributionPaid } from 'src/app/models/contribution-paid.model';
import { Contribution } from 'src/app/models/contribution.model';
import { PreContribution } from 'src/app/models/pre-contributions';
import { Transaction } from 'src/app/models/transaction.model';
import { User } from 'src/app/models/user.model';
import { PreContributionsPipe } from 'src/app/pipes/pre-contributions.pipe';
import * as ContributionsPaidActions from 'src/app/state/actions/contributions-paid.action';
import * as ContributionsActions from 'src/app/state/actions/contributions.action';
import * as PreContributionsActions from 'src/app/state/actions/pre-constribution.action';
import * as TransactionsActions from 'src/app/state/actions/transactions.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-user-contribution',
  templateUrl: './user-contribution.component.html',
  styleUrls: ['./user-contribution.component.scss'],
})
export class UserContributionComponent implements OnInit, OnDestroy {
  public user!: User | null;
  private userSubs!: Subscription;

  public contributions: Contribution[] = [];
  private contributionsSubs!: Subscription;

  public contributionsPaid: ContributionPaid[] = [];
  private contributionsPaidSubs!: Subscription;

  public preContributions: PreContribution[] = [];
  public total = 0;
  private precontributionsSubs!: Subscription;

  inputDate = new UntypedFormControl(new Date().toISOString(), [Validators.required]);

  dataSource: PreContribution[] = [];
  dataSourceColumns: string[] = [
    'description',
    'amountToPay',
    'amountPay',
    'option',
  ];

  preContributionsColumns: string[] = ['description', 'amountToPay', 'option'];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listenerStore();
    this.store.dispatch(ContributionsActions.loadContributions());
  }

  ngOnDestroy(): void {
    this.store.dispatch(ContributionsActions.cleanContributions());
    this.store.dispatch(ContributionsPaidActions.cleanContributionsPaid());

    this.userSubs?.unsubscribe();
    this.contributionsSubs?.unsubscribe();
    this.contributionsPaidSubs?.unsubscribe();
    this.precontributionsSubs?.unsubscribe();
  }

  addPreContributionPaid(preContribution: PreContribution) {
    this.store.dispatch(
      PreContributionsActions.addContributionPaid({ preContribution })
    );
  }

  substractPreContributionPaid(preContribution: PreContribution) {
    this.store.dispatch(
      PreContributionsActions.substractContributionPaid({ preContribution })
    );
  }

  confirmPay() {
    if (!this.preContributions.length) {
      this.matDialog.open(AlertComponent, {
        data: {
          title: 'Error al realizar un pago',
          content: 'Tiene que añadir por lo menos un aporte.',
        },
      });
      return;
    }
    const contributionsId = JSON.stringify(
      this.preContributions.map((p) => p.id)
    );
    const userId = this.user!.id;
    this.store.dispatch(
      ContributionsPaidActions.createManyContributionsPaid({
        userId,
        contributionsId,
        date: new Date(this.inputDate.value!),
      })
    );
  }

  reprint() {
    this.store.dispatch(
      TransactionsActions.addTransaction({
        transactions: this.genereteTransactionFromContributionsPaid(),
      })
    );
    this.router.navigate(['private/users', this.user!.id, 'receipt-view']);
  }

  private listenerStore() {
    this.userSubs = this.store.select(userFeature.selectUser).subscribe((user) => {
      this.user = user;
      if (user)
        this.store.dispatch(
          ContributionsPaidActions.loadContributionsPaid({
            userId: this.user!.id,
          })
        );
    });

    this.contributionsSubs = this.store
      .select('contributions')
      .subscribe(({ contributions }) => {
        this.contributions = contributions;
        this.dataSource = new PreContributionsPipe().transform(
          this.contributions,
          this.contributionsPaid
        );
      });

    this.contributionsPaidSubs = this.store
      .select('contributionsPaid')
      .subscribe(({ contributionsPaid, saved }) => {
        this.contributionsPaid = contributionsPaid;
        this.dataSource = new PreContributionsPipe().transform(
          this.contributions,
          this.contributionsPaid
        );
        if (saved) {
          this.store.dispatch(
            TransactionsActions.addTransaction({
              transactions: this.generateTransactions(),
            })
          );
          this.store.dispatch(PreContributionsActions.clean());
          this.router.navigate([
            'private/users',
            this.user!.id,
            'receipt-view',
          ]);
        }
      });

    this.precontributionsSubs = this.store
      .select('preContribution')
      .subscribe(({ preContributions, total }) => {
        this.preContributions = preContributions;
        this.total = total;
      });
  }

  private generateTransactions() {
    return this.preContributions.map(
      (p) =>
        new Transaction(
          p.description,
          p.amountToPay,
          new Date(this.inputDate.value!)
        )
    );
  }

  private genereteTransactionFromContributionsPaid() {
    return this.contributionsPaid.map((c) => {
      const { date, contribution, amount } = c;
      const { description } = contribution;
      return new Transaction(description, amount, date);
    });
  }
}
