import { createReducer, on } from '@ngrx/store';
import { MonthlyPayment } from 'src/app/models/monthly-payment.model';
import {
  loadPayments,
  loadPaymentsError,
  loadPaymentsSuccess,
} from '../actions/monthly-payments.action';

export interface MonthlyPaymentsState {
  monthlyPayments: MonthlyPayment[];
  loading: boolean;
  error: any;
}

export const initialMonthlyPayments: MonthlyPaymentsState = {
  monthlyPayments: [],
  loading: false,
  error: null,
};

const _monthlyPaymentsReducer = createReducer(
  initialMonthlyPayments,

  on(loadPayments, (state) => ({
    ...state,
    loading: true,
  })),

  on(loadPaymentsSuccess, (state, { monthlyPayments }) => ({
    ...state,
    monthlyPayments,
    loading: false,
    error: null,
  })),

  on(loadPaymentsError, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  }))
);

export function monthlyPaymentsReducer(state: any, action: any) {
  return _monthlyPaymentsReducer(state, action);
}
