import { createAction, props } from '@ngrx/store';
import { Expense } from 'src/app/models/expense.model';

export const load = createAction(
  '[EXPENSE] load expense by id',
  props<{ id: number }>()
);

export const loadSuccess = createAction(
  '[EXPENSE] load expense success',
  props<{ expense: Expense }>()
);

export const create = createAction(
  '[EXPENSE] create expense',
  props<{
    description: string;
    amount: number;
    date: Date;
    from_user: string;
    to_user: string;
  }>()
);

export const createSuccess = createAction(
  '[EXPENSE] create expense success',
  props<{ expense: Expense }>()
);

export const update = createAction(
  '[EXPENSE] update expense',
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
  '[EXPENSE] update expense success',
  props<{ expense: Expense }>()
);

export const remove = createAction(
  '[EXPENSE] remove expense',
  props<{ id: number }>()
);

export const removeSuccess = createAction(
  '[EXPENSE] remove expense success',
  props<{ expense: Expense }>()
);

export const error = createAction(
  '[EXPENSE] error ocurred',
  props<{ e: any }>()
);

export const clean = createAction('[EXPENSE] clean state');
