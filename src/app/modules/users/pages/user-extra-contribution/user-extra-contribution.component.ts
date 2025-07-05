import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { extraContributionFeature } from '@state/reducers/extra-contribution.reducer'
import { userFeature } from '@state/reducers/user.reducer'

import { ConfirmDialogComponent } from 'src/app/layouts/confirm-dialog/confirm-dialog.component'
import {
  ExtraContributionPaid,
  ExtraContributionPayMade,
} from 'src/app/models/extra-contribution.interface'
import { Transaction } from 'src/app/models/transaction.model'
import { ExtraContActions } from 'src/app/state/actions/extra-contribution.action'
import { addTransaction } from 'src/app/state/actions/transactions.action'

@Component({
    selector: 'app-user-extra-contribution',
    templateUrl: './user-extra-contribution.component.html',
    styleUrls: ['./user-extra-contribution.component.scss'],
    standalone: false
})
export class UserExtraContributionComponent implements OnInit, OnDestroy {
  public displayedColumns = ['extra-contribution', 'amount', 'amountPaid', 'datePaid', 'option']

  readonly extraContributionMade$ = this.store.select(
    extraContributionFeature.selectExtraContributionMade
  )

  readonly user$ = this.store.select(userFeature.selectUser)

  constructor(private store: Store, private matDialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(ExtraContActions.loadByUser())
  }

  ngOnDestroy(): void {
    this.store.dispatch(ExtraContActions.clean())
  }

  public pay(contributionId: number) {
    const dialog = this.matDialog.open(ConfirmDialogComponent, {
      data: { body: 'Esta seguro de realizar este pago?' },
    })

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          ExtraContActions.payment({
            contributionId,
            forwardSupplier: (id: number) => `/private/users/${id}/receipt-view`,
            generateTransactionsCallback: this.generateTransaction,
          })
        )
      }
    })
  }

  public printRecipe(extraContributionMade: ExtraContributionPayMade, userId: number) {
    const { name, amount_paid, date_paid } = extraContributionMade
    const transactions = [new Transaction(name, amount_paid, date_paid)]
    this.store.dispatch(addTransaction({ transactions }))
    this.router.navigate(['private/users', userId, 'receipt-view'])
  }

  private generateTransaction(extraContributionPaid: ExtraContributionPaid) {
    const { extra_contribution, amount, date } = extraContributionPaid
    return [new Transaction(extra_contribution!.name, amount, date)]
  }
}
