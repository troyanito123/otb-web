import { createAction, props } from '@ngrx/store';
import { PrePayment } from 'src/app/models/pre-payment';

export const addPayment = createAction(
  '[PAYMENT] add payment',
  props<{ prePayment: PrePayment }>()
);

export const subtractPayment = createAction(
  '[PAYMENT] subtract payment',
  props<{ id: number }>()
);

export const cleanPayment = createAction('[PAYMENT] clean payment');
