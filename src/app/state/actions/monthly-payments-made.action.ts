import { createAction, props } from '@ngrx/store';
import { MonthlyPaymentMade } from 'src/app/models/monthly-payment-made';

export const loadPaymentsMade = createAction(
  '[PAYMENTS_MADE] load monthly payments',
  props<{ id: number; year: string }>()
);

export const loadPaymentsMadeSuccess = createAction(
  '[PAYMENTS_MADE] load monthly payments made success',
  props<{ monthlyPaymentsMade: MonthlyPaymentMade[] }>()
);
export const loadPaymentsMadeError = createAction(
  '[PAYMENTS_MADE] load monthly payments made error',
  props<{ e: any }>()
);
