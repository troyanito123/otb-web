import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userFeature } from '@state/reducers/user.reducer';
import { Subscription } from 'rxjs';

import { ConfirmDialogComponent } from 'src/app/layouts/confirm-dialog/confirm-dialog.component';
import {
  ExtraContributionPaid,
  ExtraContributionPayMade,
} from 'src/app/models/extra-contribution.interface';
import { Transaction } from 'src/app/models/transaction.model';
import { User } from 'src/app/models/user.model';
import * as ExtraContActions from 'src/app/state/actions/extra-contribution.action';
import { addTransaction } from 'src/app/state/actions/transactions.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-user-extra-contribution',
  templateUrl: './user-extra-contribution.component.html',
  styleUrls: ['./user-extra-contribution.component.scss'],
})
export class UserExtraContributionComponent implements OnInit, OnDestroy {
  public displayedColumns = [
    'extra-contribution',
    'amount',
    'amountPaid',
    'datePaid',
    'option',
  ];
  public extraContributions: ExtraContributionPayMade[] = [];

  private user!: User | null;

  private storeSubs?: Subscription;
  private userSubs?: Subscription;

  constructor(
    private store: Store<AppState>,
    private matDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store.select(userFeature.selectUser).subscribe((user) => {
      this.user = user;
      user && this.store.dispatch(ExtraContActions.loadByUser({ id: user.id }));
    });

    this.storeSubs = this.store
      .select('extraContributions')
      .subscribe(({ extraContributionMade, extraContributionPaid }) => {
        this.extraContributions = extraContributionMade;
        if (extraContributionPaid) {
          this.store.dispatch(
            addTransaction({
              transactions: this.generateTransaction(extraContributionPaid),
            })
          );
          this.router.navigate([
            'private',
            'users',
            this.user!.id,
            'receipt-view',
          ]);
        }
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ExtraContActions.clean());
    this.storeSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }

  public pay(contributionId: number) {
    const dialog = this.matDialog.open(ConfirmDialogComponent, {
      data: { body: 'Esta seguro de realizar este pago?' },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          ExtraContActions.payment({ userId: this.user!.id, contributionId })
        );
      }
    });
  }

  public printRecipe(extraContributionMade: ExtraContributionPayMade) {
    const { name, amount_paid, date_paid } = extraContributionMade;
    const transactions = [new Transaction(name, amount_paid, date_paid)];
    this.store.dispatch(addTransaction({ transactions }));
    this.router.navigate(['private/users', this.user!.id, 'receipt-view']);
  }

  private generateTransaction(extraContributionPaid: ExtraContributionPaid) {
    const { extra_contribution, amount, date } = extraContributionPaid;
    return [new Transaction(extra_contribution!.name, amount, date)];
  }
}
