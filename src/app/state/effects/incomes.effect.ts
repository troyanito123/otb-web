import { Injectable } from '@angular/core'

import { mergeMap, map, catchError, tap, switchMap, filter, first } from 'rxjs/operators'
import { of } from 'rxjs'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { IncomesActions } from '@state/actions/incomes.action'

import { IncomeService } from '@services/income.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Store } from '@ngrx/store'
import { userFeature } from '@state/reducers/user.reducer'

@Injectable()
export class IncomesEffects {
  constructor(
    private actions$: Actions,
    private incomeService: IncomeService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private store: Store
  ) {}

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomesActions.load),
      mergeMap(({ id }) =>
        this.incomeService.getOne(id).pipe(
          map((income) => IncomesActions.loadSuccess({ income })),
          catchError((error) => of(IncomesActions.setError({ error })))
        )
      )
    )
  )

  updated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomesActions.update),
      mergeMap(({ id, amount, description, date, status, forwardSupplier, messageSupplier }) =>
        this.incomeService.updated(id, amount, description, date, status).pipe(
          tap((income) => {
            this.router.navigateByUrl(forwardSupplier(income.user.id))
            this.matSnackBar.open(messageSupplier(income.description), 'Ok')
          }),
          map((income) => IncomesActions.setIncome({ income })),
          catchError((error) => {
            this.matSnackBar.open('Error al editar el Ingreso', 'OK')
            return of(IncomesActions.setError({ error }))
          })
        )
      )
    )
  )

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomesActions.create),
      mergeMap(({ amount, description, collector, date, forwardSupplier, messageSupplier }) =>
        this.store.select(userFeature.selectUser).pipe(
          filter((user) => user !== null),
          first(),
          switchMap((user) =>
            this.incomeService.create(amount, description, collector, date, user!.id).pipe(
              tap((income) => {
                this.router.navigateByUrl(forwardSupplier(user!.id))
                this.matSnackBar.open(messageSupplier(income.description), 'Ok')
              })
            )
          ),
          map((income) => IncomesActions.setIncome({ income })),
          catchError((error) => {
            this.matSnackBar.open('Error al crear un ingreso para este usuario', 'OK')
            return of(IncomesActions.setError({ error }))
          })
        )
      )
    )
  )

  loadByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomesActions.loadByUser),
      mergeMap(() =>
        this.store.select(userFeature.selectUser).pipe(
          filter(user => user !== null),
          first(),
          switchMap((user) => this.incomeService.getAllByUser(user!.id)),
          map((incomes) => IncomesActions.loadByUserSuccess({ incomes })),
          catchError((error) => of(IncomesActions.setError({ error })))
        )
      )
    )
  )
}
