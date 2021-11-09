import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ExpenseActions from '../actions/expense.action';

import { ExpenseService } from 'src/app/services/expense.service';

@Injectable()
export class ExpenseEffect {
  constructor(
    private actions$: Actions,
    private expenseService: ExpenseService
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.load),
      mergeMap(({ id }) =>
        this.expenseService.getOne(id).pipe(
          map((expense) => ExpenseActions.loadSuccess({ expense })),
          catchError((e) => of(ExpenseActions.error({ e })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.create),
      mergeMap(({ description, amount, date, from_user, to_user }) =>
        this.expenseService
          .create(description, amount, date, from_user, to_user)
          .pipe(
            map((expense) => ExpenseActions.createSuccess({ expense })),
            catchError((e) => of(ExpenseActions.error({ e })))
          )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.update),
      mergeMap(({ id, description, amount, date, from_user, to_user }) =>
        this.expenseService
          .update(id, description, amount, date, from_user, to_user)
          .pipe(
            map((expense) => ExpenseActions.updateSuccess({ expense })),
            catchError((e) => of(ExpenseActions.error({ e })))
          )
      )
    )
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpenseActions.remove),
      mergeMap(({ id }) =>
        this.expenseService.remove(id).pipe(
          map((expense) => ExpenseActions.removeSuccess({ expense })),
          catchError((e) => of(ExpenseActions.error({ e })))
        )
      )
    )
  );
}
