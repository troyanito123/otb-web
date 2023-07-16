import { Injectable } from '@angular/core'
import { mergeMap, map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

import { Actions, createEffect, ofType } from '@ngrx/effects'
import { MonthlyPaymentActions } from '../actions/monthly-payments.action'
import { MonthlyPaymentService } from 'src/app/services/monthly-payment.service'

@Injectable()
export class MonthlyPaymentsEffect {
  constructor(private actions$: Actions, private monthlyPaymentService: MonthlyPaymentService) {}

  loadMonthlyPayments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentActions.loadPayments),
      mergeMap(({ year }) =>
        this.monthlyPaymentService.getMonthlyPaymentsByYear(year).pipe(
          map((monthlyPayments) => MonthlyPaymentActions.loadPaymentsSuccess({ monthlyPayments })),
          catchError((e) => of(MonthlyPaymentActions.loadPaymentsError({ e })))
        )
      )
    )
  )
}
