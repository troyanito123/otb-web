import { createAction, props } from '@ngrx/store';
import { MonthlyPaymentMade } from 'src/app/models/monthly-payment-made';

export const loadPaymentsMade = createAction(
  '[PAYMENTS_MADE] load monthly payments',
  props<{ id: number; year: string }>()
);

export const loadByDate = createAction(
  '[PAYMENTS_MADE] load payments by date',
  props<{ initDate: string; endDate: string }>()
);

export const loadPaymentsMadeSuccess = createAction(
  '[PAYMENTS_MADE] load monthly payments made success',
  props<{ monthlyPaymentsMade: MonthlyPaymentMade[] }>()
);
export const loadPaymentsMadeError = createAction(
  '[PAYMENTS_MADE] load monthly payments made error',
  props<{ e: any }>()
);

export const createManyPaymentsMade = createAction(
  '[PAYMENTS_MADE] Create many monthly payments',
  props<{ userId: number; monthsId: string; date: Date }>()
);

export const addPaymentsMade = createAction(
  '[PAYMENTS_MADE] add monthly payments',
  props<{ monthlyPaymentsMade: MonthlyPaymentMade[] }>()
);

export const clean = createAction('[PAYMENTS_MADE] clean payments made state');
