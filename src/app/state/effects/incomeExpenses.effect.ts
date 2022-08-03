import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as IncomeExpensesActions from '../actions/income-expenses.actions';
import { MonthlyPaymentMadeService } from 'src/app/services/monthly-payment-made.service';
import { CertificationService } from 'src/app/services/certification.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { ContributionPaidService } from 'src/app/services/contribution-paid.service';
import { FineService } from 'src/app/services/fine.service';
import { IncomeService } from '@services/income.service';
import { ExtraContributionService } from '@services/extra-contribution.service';

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

  certificationsTotal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeExpensesActions.loadCertifications),
      mergeMap(() =>
        this.certificationService.getTotalAmount().pipe(
          map(({ total }) =>
            IncomeExpensesActions.loadCertificationsSuccess({ total })
          ),
          catchError((e) => of(IncomeExpensesActions.error({ e })))
        )
      )
    )
  );

  contributionsTotal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeExpensesActions.loadContribution),
      mergeMap(() =>
        this.contributionPaidService.getTotalAmount().pipe(
          map(({ total }) =>
            IncomeExpensesActions.loadContributionSuccess({ total })
          ),
          catchError((e) => of(IncomeExpensesActions.error({ e })))
        )
      )
    )
  );
  extraContributionsTotal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeExpensesActions.loadExtraContribution),
      mergeMap(() =>
        this.extraContributionService.getTotalAmount().pipe(
          map(({ total }) =>
            IncomeExpensesActions.loadExtraContributionSuccess({ total })
          ),
          catchError((e) => of(IncomeExpensesActions.error({ e })))
        )
      )
    )
  );

  incomesTotal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeExpensesActions.loadIncome),
      mergeMap(() =>
        this.incomeService.getTotalAmount().pipe(
          map(({ total }) =>
            IncomeExpensesActions.loadIncomeSuccess({ total })
          ),
          catchError((e) => of(IncomeExpensesActions.error({ e })))
        )
      )
    )
  );

  monthlyPaymentsTotal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeExpensesActions.loadMonthlyPayments),
      mergeMap(() =>
        this.monthlyPaymentMadeService.getTotalAmount().pipe(
          map(({ total }) =>
            IncomeExpensesActions.loadMonthlyPaymentSuccess({ total })
          ),
          catchError((e) => of(IncomeExpensesActions.error({ e })))
        )
      )
    )
  );

  finesTotal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeExpensesActions.loadFines),
      mergeMap(() =>
        this.fineService.getTotalAmount().pipe(
          map(({ total }) => IncomeExpensesActions.loadFinesSuccess({ total })),
          catchError((e) => of(IncomeExpensesActions.error({ e })))
        )
      )
    )
  );

  expensesTotal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomeExpensesActions.loadExpenses),
      mergeMap(() =>
        this.expenseService.getTotalAmount().pipe(
          map(({ total }) =>
            IncomeExpensesActions.loadExpensesSuccess({ total })
          ),
          catchError((e) => of(IncomeExpensesActions.error({ e })))
        )
      )
    )
  );
}
