import { createAction, props } from '@ngrx/store';
import { Expense } from 'src/app/models/expense.model';

export const load = createAction('[EXPENSES] load expenses');

export const loadSuccess = createAction(
  '[EXPENSES] load expenses success',
  props<{ expenses: Expense[] }>()
);

export const create = createAction(
  '[EXPENSES] create expense',
  props<{
    description: string;
    amount: number;
    date: Date;
    from_user: string;
    to_user: string;
  }>()
);

export const createSuccess = createAction(
  '[EXPENSES] create expense success',
  props<{ expense: Expense }>()
);

export const update = createAction(
  '[EXPENSES] update expense',
  props<{
    id: number;
    description: string;
    amount: number;
    date: Date;
    from_user: string;
    to_user: string;
  }>()
);

export const updateSuccess = createAction(
  '[EXPENSES] update expense success',
  props<{ expense: Expense }>()
);

export const remove = createAction(
  '[EXPENSES] remove expense',
  props<{
    id: number;
  }>()
);

export const removeSuccess = createAction(
  '[EXPENSES] remove expense success',
  props<{ expense: Expense }>()
);

export const error = createAction('[EXPENSES] error', props<{ e: any }>());

export const clean = createAction('[EXPENSES] clean');
export const softClean = createAction('[EXPENSES] clean without expenses');
