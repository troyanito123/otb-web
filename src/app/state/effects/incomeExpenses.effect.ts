import { Injectable } from '@angular/core'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { combineLatest, of } from 'rxjs'

import { Actions, createEffect, ofType } from '@ngrx/effects'

import { IncomeExpensesActions } from '../actions/income-expenses.actions'
import { MonthlyPaymentMadeService } from 'src/app/services/monthly-payment-made.service'
import { CertificationService } from 'src/app/services/certification.service'
import { ExpenseService } from 'src/app/services/expense.service'
import { ContributionPaidService } from 'src/app/services/contribution-paid.service'
import { FineService } from 'src/app/services/fine.service'
import { IncomeService } from '@services/income.service'
import { ExtraContributionService } from '@services/extra-contribution.service'

@Injectable()
export class IncomeExpensesEffect {
  constructor(
    private actions$: Actions,
    private contributionPaidService: ContributionPaidService,
    private incomeService: IncomeService,
    private extraContributionService: ExtraContributionService,
    private monthlyPaymentMadeService: MonthlyPaymentMadeService,
    private certificationService: CertificationService,
    private expenseService: ExpenseService,
    private fineService: FineService
  ) {}

  loadIncomesExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeExpensesActions.loadIncomesExpenses),
      mergeMap(() =>
        combineLatest([
          this.certificationService.getTotalAmount(),
          this.contributionPaidService.getTotalAmount(),
          this.extraContributionService.getTotalAmount(),
          this.incomeService.getTotalAmount(),
          this.monthlyPaymentMadeService.getTotalAmount(),
          this.fineService.getTotalAmount(),
          this.expenseService.getTotalAmount(),
        ]).pipe(
          map(
            ([
              certifications,
              contributions,
              extraContributions,
              incomes,
              monthlyPayments,
              fines,
              expenses,
            ]) =>
              IncomeExpensesActions.loadIncomesExpensesSuccess({
                certifications: Number(certifications.total),
                contributions: Number(contributions.total),
                extraContributions: Number(extraContributions.total),
                monthlyPayments: Number(monthlyPayments.total),
                fines: Number(fines.total),
                expenses: Number(expenses.total),
                incomesFromPeople: Number(incomes.total),
              })
          ),
          catchError((e) => of(IncomeExpensesActions.error({ e })))
        )
      )
    )
  )
}
