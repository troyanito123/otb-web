import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import { Actions, createEffect, ofType } from '@ngrx/effects'

import { ExpenseActions } from '../actions/expense.action'

import { ExpenseService } from 'src/app/services/expense.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class ExpenseEffect {
  constructor(
    private actions$: Actions,
    private expenseService: ExpenseService,
    private router: Router,
    private matSnackbar: MatSnackBar
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.load),
      mergeMap(({ id }) =>
        this.expenseService.getOne(id).pipe(
          map((expense) => ExpenseActions.loadOrSaveSuccess({ expense })),
          catchError((e) => of(ExpenseActions.error({ e })))
        )
      )
    )
  )

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.create),
      mergeMap(({ description, amount, date, from_user, to_user, forwardSupplier }) =>
        this.expenseService.create(description, amount, date, from_user, to_user).pipe(
          tap((expense) => {
            this.router.navigateByUrl(forwardSupplier(expense.id))
          }),
          map((expense) => ExpenseActions.loadOrSaveSuccess({ expense })),
          catchError((e) => of(ExpenseActions.error({ e })))
        )
      )
    )
  )

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.update),
      mergeMap(
        ({ id, description, amount, date, from_user, to_user, forwardSupplier, messageSupplier }) =>
          this.expenseService.update(id, description, amount, date, from_user, to_user).pipe(
            tap((expense) => {
              this.router.navigateByUrl(forwardSupplier(expense.id))
              this.matSnackbar.open(messageSupplier(expense), 'Ok')
            }),
            map((expense) => ExpenseActions.loadOrSaveSuccess({ expense })),
            catchError((e) => of(ExpenseActions.error({ e })))
          )
      )
    )
  )

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.remove),
      mergeMap(({ id, forwardSupplier, messageSupplier }) =>
        this.expenseService.remove(id).pipe(
          tap((expense) => {
            this.router.navigateByUrl(forwardSupplier())
            this.matSnackbar.open(messageSupplier(expense), 'Ok')
          }),
          map((expense) => ExpenseActions.loadOrSaveSuccess({ expense })),
          catchError((e) => of(ExpenseActions.error({ e })))
        )
      )
    )
  )
}
