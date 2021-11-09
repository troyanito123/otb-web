import { createAction, props } from '@ngrx/store';
import { MonthlyPayment } from 'src/app/models/monthly-payment.model';

export const loadPayments = createAction(
  '[PAYMENTS] load monthly payments',
  props<{ year: string }>()
);

export const loadPaymentsSuccess = createAction(
  '[PAYMENTS] load monthly payments success',
  props<{ monthlyPayments: MonthlyPayment[] }>()
);
export const loadPaymentsError = createAction(
  '[PAYMENTS] load monthly payments error',
  props<{ e: any }>()
);

export const clean = createAction('[PAYMENTS] clean payments state');
