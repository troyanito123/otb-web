import { createAction, props } from '@ngrx/store';
import { IncomeModel } from 'src/app/models/income.model';

export const load = createAction(
  '[INCOMES] load income',
  props<{ id: number }>()
);

export const loadSuccess = createAction(
  '[INCOMES] load income succes',
  props<{ income: IncomeModel }>()
);

export const setIncome = createAction(
  '[INCOMES] set income',
  props<{ income: IncomeModel }>()
);

export const setError = createAction(
  '[INCOMES] set error',
  props<{ error: any }>()
);

export const create = createAction(
  '[INCOMES] create income',
  props<{ amount: number; description: string; date: Date; userId: number }>()
);

export const update = createAction(
  '[INCOMES] update income',
  props<{
    id: number;
    amount: number;
    description: string;
    date: Date;
    status: string;
  }>()
);

export const clean = createAction('[INCOMES] clean');

export const setSaved = createAction('[INCOMES] set saved to true');
export const unsetSaved = createAction('[INCOMES] set saved to false');
