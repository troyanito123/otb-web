import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {IncomesActions} from '@state/actions/incomes.action';

import { IncomeService } from '@services/income.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class IncomesEffects {
  constructor(
    private actions$: Actions,
    private incomeService: IncomeService,
    private router: Router,
    private matSnackBar: MatSnackBar
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
  );

  updated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomesActions.update),
      mergeMap(({ id, amount, description, date, status, forwardSupplier }) =>
        this.incomeService.updated(id, amount, description, date, status).pipe(
          map((income) => IncomesActions.setIncome({ income })),
          tap(() => this.router.navigateByUrl(forwardSupplier(id))),
          catchError((error) => {
            this.matSnackBar.open('Error al editar el Ingreso', 'OK')
            return of(IncomesActions.setError({ error }))
          })
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomesActions.create),
      mergeMap(({ amount, description, collector, date, userId }) =>
        this.incomeService
          .create(amount, description, collector, date, userId)
          .pipe(
            map((income) => IncomesActions.setIncome({ income })),
            catchError((error) => of(IncomesActions.setError({ error })))
          )
      )
    )
  );

  loadByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomesActions.loadByUser),
      mergeMap(({ userId }) =>
        this.incomeService.getAllByUser(userId).pipe(
          map((incomes) => IncomesActions.loadByUserSuccess({ incomes })),
          catchError((error) => of(IncomesActions.setError({ error })))
        )
      )
    )
  );
}
