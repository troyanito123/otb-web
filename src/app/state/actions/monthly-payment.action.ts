import { createAction, props } from '@ngrx/store';
import { MonthlyPayment } from 'src/app/models/monthly-payment.model';

export const load = createAction(
  '[MONTHLY-PAYMENT] load monthly payment',
  props<{ id: number }>()
);

export const loadSuccess = createAction(
  '[MONTHLY-PAYMENT] load monthly payment success',
  props<{ monthlyPayment: MonthlyPayment }>()
);

export const create = createAction(
  '[MONTHLY-PAYMENT] create monthly payment',
  props<{ year: string; month: string; amount: number }>()
);

export const createSuccess = createAction(
  '[MONTHLY-PAYMENT] create monthly payment success',
  props<{ monthlyPayment: MonthlyPayment }>()
);

export const update = createAction(
  '[MONTHLY-PAYMENT] update monthly payment',
  props<{ id: number; year: string; month: string; amount: number }>()
);

export const updateSuccess = createAction(
  '[MONTHLY-PAYMENT] update monthly payment success',
  props<{ monthlyPayment: MonthlyPayment }>()
);

export const remove = createAction(
  '[MONTHLY-PAYMENT] remove monthly payment',
  props<{ id: number }>()
);

export const removeSuccess = createAction(
  '[MONTHLY-PAYMENT] remove monthly payment success',
  props<{ monthlyPayment: MonthlyPayment }>()
);

export const error = createAction(
  '[MONTHLY-PAYMENT] error',
  props<{ e: any }>()
);

export const clean = createAction(
  '[MONTHLY-PAYMENT] clean all monthly payment state'
);
export const softClean = createAction(
  '[MONTHLY-PAYMENT] clean created updated removed'
);
