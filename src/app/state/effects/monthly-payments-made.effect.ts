import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as MonthlyPaymentsMadeActions from '../actions/monthly-payments-made.action';
import { MonthlyPaymentMadeService } from 'src/app/services/monthly-payment-made.service';

@Injectable()
export class MonthlyPaymentsMadeEffect {
  constructor(
    private actions$: Actions,
    private monthlyPaymentMadeService: MonthlyPaymentMadeService
  ) {}

  loadMonthlyPaymentsMade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentsMadeActions.loadPaymentsMade),
      mergeMap(({ id, year }) =>
        this.monthlyPaymentMadeService
          .getMonthlyPaymentsMadeByUserAndYear(id, year)
          .pipe(
            map((monthlyPaymentsMade) =>
              MonthlyPaymentsMadeActions.loadPaymentsMadeSuccess({
                monthlyPaymentsMade,
              })
            ),
            catchError((e) =>
              of(MonthlyPaymentsMadeActions.loadPaymentsMadeError({ e }))
            )
          )
      )
    )
  );

  createManyMonthlyPaymentsMade$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentsMadeActions.createManyPaymentsMade),
      mergeMap(({ userId, monthsId, date }) =>
        this.monthlyPaymentMadeService
          .createManyMonthlyPayments(userId, monthsId, date)
          .pipe(
            map((monthlyPaymentsMade) =>
              MonthlyPaymentsMadeActions.addPaymentsMade({
                monthlyPaymentsMade,
              })
            ),
            catchError((e) =>
              of(MonthlyPaymentsMadeActions.loadPaymentsMadeError({ e }))
            )
          )
      )
    )
  );
}
