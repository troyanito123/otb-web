import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ExpensesActions from '../actions/expenses.action';

import { ExpenseService } from 'src/app/services/expense.service';

@Injectable()
export class ExpensesEffect {
  constructor(
    private actions$: Actions,
    private expenseService: ExpenseService
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpensesActions.load),
      mergeMap(() =>
        this.expenseService.getAll().pipe(
          map(({ expenses }) => ExpensesActions.loadSuccess({ expenses })),
          catchError((e) => of(ExpensesActions.error({ e })))
        )
      )
    )
  );

  loadByDates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExpensesActions.loadByDates),
      mergeMap(({ initDate, endDate }) =>
        this.expenseService.getByDateRange(initDate, endDate).pipe(
          map((expenses) => ExpensesActions.loadSuccess({ expenses })),
          catchError((e) => of(ExpensesActions.error({ e })))
        )
      )
    )
  );
}
