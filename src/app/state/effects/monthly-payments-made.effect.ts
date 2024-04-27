import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, switchMap, tap, filter, first } from 'rxjs/operators'
import { of } from 'rxjs'

import { Actions, createEffect, ofType } from '@ngrx/effects'

import { MonthlyPaymentMadeActions } from '../actions/monthly-payments-made.action'
import { MonthlyPaymentMadeService } from 'src/app/services/monthly-payment-made.service'
import { Store } from '@ngrx/store'
import { userFeature } from '@state/reducers/user.reducer'
import { addTransaction } from '@state/actions/transactions.action'
import { Router } from '@angular/router'
import { PrePaymentActions } from '@state/actions/pre-payment.action'

@Injectable()
export class MonthlyPaymentsMadeEffect {
  constructor(
    private actions$: Actions,
    private monthlyPaymentMadeService: MonthlyPaymentMadeService,
    private store: Store,
    private router: Router
  ) {}

  loadMonthlyPaymentsMade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentMadeActions.loadPaymentsMade),
      mergeMap(({ year }) =>
        this.store.select(userFeature.selectUser).pipe(
          filter((user) => user !== null),
          first(),
          switchMap((user) =>
            this.monthlyPaymentMadeService.getMonthlyPaymentsMadeByUserAndYear(user!.id, year)
          ),
          map((monthlyPaymentsMade) =>
            MonthlyPaymentMadeActions.loadPaymentsMadeSuccess({ monthlyPaymentsMade })
          ),
          catchError((e) => of(MonthlyPaymentMadeActions.loadPaymentsMadeError({ e })))
        )
      )
    )
  )

  loadByDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentMadeActions.loadByDate),
      mergeMap(({ initDate, endDate }) =>
        this.monthlyPaymentMadeService.getByDate(initDate, endDate).pipe(
          map((monthlyPaymentsMade) =>
            MonthlyPaymentMadeActions.loadPaymentsMadeSuccess({
              monthlyPaymentsMade,
            })
          ),
          catchError((e) => of(MonthlyPaymentMadeActions.loadPaymentsMadeError({ e })))
        )
      )
    )
  )

  createManyMonthlyPaymentsMade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentMadeActions.createManyPaymentsMade),
      mergeMap(({ monthsId, date, generateTransactionsCallbak, forwardSupplier }) =>
        this.store.select(userFeature.selectUser).pipe(
          filter((user) => user !== null),
          first(),
          switchMap((user) =>
            this.monthlyPaymentMadeService.createManyMonthlyPayments(user!.id, monthsId, date)
          ),
          map((monthlyPaymentsMade) =>
            MonthlyPaymentMadeActions.addPaymentsMade({
              monthlyPaymentsMade,
              generateTransactionsCallbak,
              forward: forwardSupplier(monthlyPaymentsMade[0].user.id),
            })
          ),
          catchError((e) => of(MonthlyPaymentMadeActions.loadPaymentsMadeError({ e })))
        )
      )
    )
  )

  addPaymentsMade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentMadeActions.addPaymentsMade),
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
