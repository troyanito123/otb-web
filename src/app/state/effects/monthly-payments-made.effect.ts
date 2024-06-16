import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, switchMap, tap, filter, first } from 'rxjs/operators'
import { of } from 'rxjs'

import { Actions, createEffect, ofType } from '@ngrx/effects'

import { MonthlyPaymentsMadeActions } from '../actions/monthly-payments-made.action'
import { MonthlyPaymentMadeService } from 'src/app/services/monthly-payment-made.service'
import { Store } from '@ngrx/store'
import { userFeature } from '@state/reducers/user.reducer'
import { addTransaction } from '@state/actions/transactions.action'
import { Router } from '@angular/router'
import { PrePaymentActions } from '@state/actions/pre-payment.action'
import { PrintTableService } from '@services/print-table.service'

@Injectable()
export class MonthlyPaymentsMadeEffect {
  constructor(
    private actions$: Actions,
    private monthlyPaymentMadeService: MonthlyPaymentMadeService,
    private store: Store,
    private router: Router,
    private printTableService: PrintTableService,
  ) {}

  loadMonthlyPaymentsMade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentsMadeActions.loadPaymentsMade),
      mergeMap(({ year }) =>
        this.store.select(userFeature.selectUser).pipe(
          filter((user) => user !== null),
          first(),
          switchMap((user) =>
            this.monthlyPaymentMadeService.getMonthlyPaymentsMadeByUserAndYear(user!.id, year)
          ),
          map((monthlyPaymentsMade) =>
            MonthlyPaymentsMadeActions.loadPaymentsMadeSuccess({ monthlyPaymentsMade })
          ),
          catchError((e) => of(MonthlyPaymentsMadeActions.loadPaymentsMadeError({ e })))
        )
      )
    )
  )

  loadByDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentsMadeActions.loadByDate),
      mergeMap(({ initDate, endDate, handlerCallback }) =>
        this.monthlyPaymentMadeService.getByDate(initDate, endDate).pipe(
          tap((monthlyPaymentsMade) => {
            this.printTableService.generatePdf(handlerCallback(monthlyPaymentsMade, initDate, endDate))
          }),
          map((monthlyPaymentsMade) =>
            MonthlyPaymentsMadeActions.loadPaymentsMadeSuccess({
              monthlyPaymentsMade,
            })
          ),
          catchError((e) => of(MonthlyPaymentsMadeActions.loadPaymentsMadeError({ e })))
        )
      )
    )
  )

  createManyMonthlyPaymentsMade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentsMadeActions.createManyPaymentsMade),
      mergeMap(({ monthsId, date, generateTransactionsCallbak, forwardSupplier }) =>
        this.store.select(userFeature.selectUser).pipe(
          filter((user) => user !== null),
          first(),
          switchMap((user) =>
            this.monthlyPaymentMadeService.createManyMonthlyPayments(user!.id, monthsId, date)
          ),
          map((monthlyPaymentsMade) =>
            MonthlyPaymentsMadeActions.addPaymentsMade({
              monthlyPaymentsMade,
              generateTransactionsCallbak,
              forward: forwardSupplier(monthlyPaymentsMade[0].user.id),
            })
          ),
          catchError((e) => of(MonthlyPaymentsMadeActions.loadPaymentsMadeError({ e })))
        )
      )
    )
  )

  addPaymentsMade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentsMadeActions.addPaymentsMade),
      mergeMap(({ monthlyPaymentsMade, generateTransactionsCallbak, forward }) =>
        of(addTransaction({ transactions: generateTransactionsCallbak(monthlyPaymentsMade) })).pipe(
          tap(() => {
            this.router.navigateByUrl(forward)
            this.store.dispatch(PrePaymentActions.cleanPayment())
          })
        )
      )
    )
  )
}
