import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as MonthlyPaymentActions from '../actions/monthly-payment.action';
import { MonthlyPaymentService } from 'src/app/services/monthly-payment.service';

@Injectable()
export class MonthlyPaymentEffect {
  constructor(
    private actions$: Actions,
    private monthlyPaymentService: MonthlyPaymentService
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentActions.load),
      mergeMap(({ id }) =>
        this.monthlyPaymentService.getOne(id).pipe(
          map((monthlyPayment) =>
            MonthlyPaymentActions.loadSuccess({ monthlyPayment })
          ),
          catchError((e) => of(MonthlyPaymentActions.error({ e })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentActions.create),
      mergeMap(({ year, month, amount }) =>
        this.monthlyPaymentService.create(year, month, amount).pipe(
          map((monthlyPayment) =>
            MonthlyPaymentActions.createSuccess({ monthlyPayment })
          ),
          catchError((e) => of(MonthlyPaymentActions.error({ e })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentActions.update),
      mergeMap(({ id, year, month, amount }) =>
        this.monthlyPaymentService.update(id, year, month, amount).pipe(
          map((monthlyPayment) =>
            MonthlyPaymentActions.updateSuccess({ monthlyPayment })
          ),
          catchError((e) => of(MonthlyPaymentActions.error({ e })))
        )
      )
    )
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentActions.remove),
      mergeMap(({ id }) =>
        this.monthlyPaymentService.remove(id).pipe(
          map((monthlyPayment) =>
            MonthlyPaymentActions.removeSuccess({ monthlyPayment })
          ),
          catchError((e) => of(MonthlyPaymentActions.error({ e })))
        )
      )
    )
  );
}
