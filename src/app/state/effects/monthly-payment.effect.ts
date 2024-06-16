import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import { Actions, createEffect, ofType } from '@ngrx/effects'

import { MonthlyPaymentActions } from '../actions/monthly-payment.action'
import { MonthlyPaymentService } from 'src/app/services/monthly-payment.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class MonthlyPaymentEffect {
  constructor(
    private actions$: Actions,
    private monthlyPaymentService: MonthlyPaymentService,
    private router: Router,
    private matSnackbar: MatSnackBar
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentActions.load),
      mergeMap(({ id }) =>
        this.monthlyPaymentService.getOne(id).pipe(
          map((monthlyPayment) => MonthlyPaymentActions.saveOrLoadSuccess({ monthlyPayment })),
          catchError((e) => of(MonthlyPaymentActions.error({ e })))
        )
      )
    )
  )

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentActions.create),
      mergeMap(({ year, month, amount, forwardSupplier }) =>
        this.monthlyPaymentService.create(year, month, amount).pipe(
          tap((monthlyPayment) => {
            this.router.navigateByUrl(forwardSupplier(monthlyPayment.id))
          }),
          map((monthlyPayment) => MonthlyPaymentActions.saveOrLoadSuccess({ monthlyPayment })),
          catchError((e) => of(MonthlyPaymentActions.error({ e })))
        )
      )
    )
  )

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentActions.update),
      mergeMap(({ id, year, month, amount, forwardSupplier }) =>
        this.monthlyPaymentService.update(id, year, month, amount).pipe(
          tap((monthlyPayment) => {
            this.router.navigateByUrl(forwardSupplier(monthlyPayment.id))
          }),
          map((monthlyPayment) => MonthlyPaymentActions.saveOrLoadSuccess({ monthlyPayment })),
          catchError((e) => of(MonthlyPaymentActions.error({ e })))
        )
      )
    )
  )

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MonthlyPaymentActions.remove),
      mergeMap(({ id, forwardSupplier, messageSupplier }) =>
        this.monthlyPaymentService.remove(id).pipe(
          tap(() => {
            this.router.navigateByUrl(forwardSupplier())
            this.matSnackbar.open(messageSupplier(), 'Ok')
          }),
          map((monthlyPayment) => MonthlyPaymentActions.saveOrLoadSuccess({ monthlyPayment })),
          catchError((e) => of(MonthlyPaymentActions.error({ e })))
        )
      )
    )
  )
}
