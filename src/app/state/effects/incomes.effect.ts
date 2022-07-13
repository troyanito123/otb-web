import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as IncomesAction from '@state/actions/incomes.action';

import { IncomeService } from '@services/income.service';

@Injectable()
export class IncomesEffects {
  constructor(
    private actions$: Actions,
    private incomeService: IncomeService
  ) {}

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomesAction.load),
      mergeMap(({ id }) =>
        this.incomeService.getOne(id).pipe(
          map((income) => IncomesAction.loadSuccess({ income })),
          catchError((error) => of(IncomesAction.setError({ error })))
        )
      )
    )
  );

  updated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomesAction.update),
      mergeMap(({ id, amount, description, date, status }) =>
        this.incomeService.updated(id, amount, description, date, status).pipe(
          map((income) => IncomesAction.setIncome({ income })),
          catchError((error) => of(IncomesAction.setError({ error })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomesAction.create),
      mergeMap(({ amount, description, collector, date, userId }) =>
        this.incomeService
          .create(amount, description, collector, date, userId)
          .pipe(
            map((income) => IncomesAction.setIncome({ income })),
            catchError((error) => of(IncomesAction.setError({ error })))
          )
      )
    )
  );

  loadByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncomesAction.loadByUser),
      mergeMap(({ userId }) =>
        this.incomeService.getAllByUser(userId).pipe(
          map((incomes) => IncomesAction.loadByUserSuccess({ incomes })),
          catchError((error) => of(IncomesAction.setError({ error })))
        )
      )
    )
  );
}
