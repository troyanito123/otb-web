import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { contributionPaidFeature } from '@state/reducers/contributions-paid.reducer'
import { contributionsFeature } from '@state/reducers/contributions.reducer'
import { preContributionFeature } from '@state/reducers/pre-contribution.reducer'
import { userFeature } from '@state/reducers/user.reducer'

import { AlertComponent } from 'src/app/layouts/alert/alert.component'
import { ContributionPaid } from 'src/app/models/contribution-paid.model'

import { PreContribution } from 'src/app/models/pre-contributions'
import { Transaction } from 'src/app/models/transaction.model'

import { ContributionsPaidActions } from 'src/app/state/actions/contributions-paid.action'
import { ContributionsActions } from 'src/app/state/actions/contributions.action'
import { PreContributionsActions } from 'src/app/state/actions/pre-constribution.action'
import * as TransactionsActions from 'src/app/state/actions/transactions.action'
import { AppState } from 'src/app/state/app.reducer'
import { formatShortDate } from 'src/app/utils/helper'

@Component({
  selector: 'app-user-contribution',
  templateUrl: './user-contribution.component.html',
  styleUrls: ['./user-contribution.component.scss'],
})
export class UserContributionComponent implements OnInit, OnDestroy {
  public inputDate = new FormControl(new Date().toISOString(), [Validators.required])

  readonly dataSourceColumns: string[] = ['description', 'amountToPay', 'amountPay', 'option']
  readonly preContributionsColumns: string[] = ['description', 'amountToPay', 'option']

  readonly contributions$ = this.store.select(contributionsFeature.selectContributions)
  readonly contributionsPaid$ = this.store.select(contributionPaidFeature.selectContributionsPaid)
  readonly user$ = this.store.select(userFeature.selectUser)
  readonly preContributions$ = this.store.select(preContributionFeature.selectPreContributions)
  readonly total$ = this.store.select(preContributionFeature.selectTotal)

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ContributionsActions.loadContributions())
    this.store.dispatch(ContributionsPaidActions.loadContributionsPaid())
  }

  ngOnDestroy(): void {
    this.store.dispatch(ContributionsActions.cleanContributions())
    this.store.dispatch(ContributionsPaidActions.cleanContributionsPaid())
  }

  addPreContributionPaid(preContribution: PreContribution) {
    this.store.dispatch(PreContributionsActions.addContributionPaid({ preContribution }))
  }

  substractPreContributionPaid(preContribution: PreContribution) {
    this.store.dispatch(PreContributionsActions.substractContributionPaid({ preContribution }))
  }

  confirmPay(preContributions: PreContribution[]) {
    if (!preContributions.length) {
      this.matDialog.open(AlertComponent, {
        data: {
          title: 'Error al realizar un pago',
          content: 'Tiene que añadir por lo menos un aporte.',
        },
      })
      return
    }
    const contributionsId = JSON.stringify(preContributions.map((p) => p.id))
    this.store.dispatch(
      ContributionsPaidActions.createManyContributionsPaid({
        contributionsId,
        date: new Date(this.inputDate.value!),
        generateTransactionsCallback: this.genereteTransaction,
        forwadSupplier: (id: number) => `private/users/${id}/receipt-view`,
      })
    )
  }

  reprint(userId: number, contributionPaid: ContributionPaid[]) {
    this.store.dispatch(
      TransactionsActions.addTransaction({
        transactions: this.generateTransactionsReprint(contributionPaid),
      })
    )
    this.router.navigate(['private/users', userId, 'receipt-view'])
  }

  private genereteTransaction(contributionPaid: ContributionPaid[]) {
    return contributionPaid.map((c) => {
      const { date, contribution, amount } = c
      const { description } = contribution
      return new Transaction(`${description}`, amount, date)
    })
  }

  private generateTransactionsReprint(contributionPaid: ContributionPaid[]) {
    const { desc, total } = contributionPaid.reduce(
      (acum: { desc: string[]; total: number }, curr) => {
        acum = {
          desc: [
            ...acum.desc,
            `Fecha: ${formatShortDate(curr.date)}. Razon: ${
              curr.contribution.description
            }. Monto: ${curr.contribution.amount} Bs.`,
          ],
          total: acum.total + curr.contribution.amount,
        }
        return acum
      },
      { desc: [], total: 0 }
    )
    return [new Transaction(`REPRINT: ${desc.join(' | ')}`, total, new Date())]
  }
}
