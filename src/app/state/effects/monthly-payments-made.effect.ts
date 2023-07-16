import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

import { Actions, createEffect, ofType } from '@ngrx/effects'

import { MonthlyPaymentMadeActions } from '../actions/monthly-payments-made.action'
import { MonthlyPaymentMadeService } from 'src/app/services/monthly-payment-made.service'
import { Store } from '@ngrx/store'
import { userFeature } from '@state/reducers/user.reducer'

@Injectable()
export class MonthlyPaymentsMadeEffect {
  constructor(
    private actions$: Actions,
    private monthlyPaymentMadeService: MonthlyPaymentMadeService,
    private store: Store
  ) {}

  loadMonthlyPaymentsMade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentMadeActions.loadPaymentsMade),
      mergeMap(({ year }) =>
        this.store.select(userFeature.selectUser).pipe(
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
      mergeMap(({ userId, monthsId, date }) =>
        this.monthlyPaymentMadeService.createManyMonthlyPayments(userId, monthsId, date).pipe(
          map((monthlyPaymentsMade) =>
            MonthlyPaymentMadeActions.addPaymentsMade({
              monthlyPaymentsMade,
            })
          ),
          catchError((e) => of(MonthlyPaymentMadeActions.loadPaymentsMadeError({ e })))
        )
      )
    )
  )
}
