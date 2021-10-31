import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { RoleService } from 'src/app/services/role.service';
import * as MonthlyPaymentsActions from '../actions/monthly-payments.action';
import { MonthlyPaymentService } from 'src/app/services/monthly-payment.service';

@Injectable()
export class MonthlyPaymentsEffect {
  constructor(
    private actions$: Actions,
    private monthlyPaymentService: MonthlyPaymentService
  ) {}

  loadMonthlyPayments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentsActions.loadPayments),
      mergeMap(({ year }) =>
        this.monthlyPaymentService.getMonthlyPaymentsByYear(year).pipe(
          map((monthlyPayments) =>
            MonthlyPaymentsActions.loadPaymentsSuccess({ monthlyPayments })
          ),
          catchError((e) => of(MonthlyPaymentsActions.loadPaymentsError({ e })))
        )
      )
    )
  );
}
