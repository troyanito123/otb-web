import { createAction, props } from '@ngrx/store';
import { Expense } from 'src/app/models/expense.model';

export const load = createAction('[EXPENSES] load expenses');

export const loadByDates = createAction(
  '[EXPENSES] load expenses by date',
  props<{ initDate: string; endDate: string }>()
);

export const loadSuccess = createAction(
  '[EXPENSES] load expenses success',
  props<{ expenses: Expense[] }>()
);

export const error = createAction('[EXPENSES] error', props<{ e: any }>());

export const clean = createAction('[EXPENSES] clean');
