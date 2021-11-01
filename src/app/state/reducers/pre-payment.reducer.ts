import { createReducer, on } from '@ngrx/store';
import { PrePayment } from 'src/app/models/pre-payment';
import * as PrePaymentActions from '../actions/pre-payment.action';

export interface PrePaymentState {
  prePayments: PrePayment[];
}

export const initialPrePaymentState: PrePaymentState = {
  prePayments: [],
};

const _prePaymentReducer = createReducer(
  initialPrePaymentState,

  on(PrePaymentActions.addPayment, (state, { prePayment }) => ({
    prePayments: state.prePayments.find((p) => p.id === prePayment.id)
      ? [...state.prePayments]
      : [...state.prePayments, prePayment],
  })),

  on(PrePaymentActions.subtractPayment, (state, { id }) => ({
    prePayments: state.prePayments.filter((p) => p.id !== id),
  })),

  on(PrePaymentActions.cleanPayment, () => ({
    prePayments: [],
  }))
);

export function prePaymentReducer(state: any, action: any) {
  return _prePaymentReducer(state, action);
}
