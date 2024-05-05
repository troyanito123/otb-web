import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ExpensesActions } from '../actions/expenses.action';

import { ExpenseService } from 'src/app/services/expense.service';
import { PrintTableService } from '@services/print-table.service';

@Injectable()
export class ExpensesEffect {
  constructor(
    private actions$: Actions,
    private expenseService: ExpenseService,
    private printTableService: PrintTableService,
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
      mergeMap(({ initDate, endDate, handlerCallback }) =>
        this.expenseService.getByDateRange(initDate, endDate).pipe(
          tap((expenses) => {
            this.printTableService.generatePdf(handlerCallback(expenses, initDate, endDate))
          }),
          map((expenses) => ExpensesActions.loadSuccess({ expenses })),
          catchError((e) => of(ExpensesActions.error({ e })))
        )
      )
    )
  );
}
