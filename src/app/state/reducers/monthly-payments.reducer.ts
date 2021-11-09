import { createReducer, on } from '@ngrx/store';
import { MonthlyPayment } from 'src/app/models/monthly-payment.model';
import * as MonthlyPaymentsActions from '../actions/monthly-payments.action';

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

  on(MonthlyPaymentsActions.loadPayments, (state) => ({
    ...state,
    loading: true,
  })),

  on(
    MonthlyPaymentsActions.loadPaymentsSuccess,
    (state, { monthlyPayments }) => ({
      ...state,
      monthlyPayments,
      loading: false,
      error: null,
    })
  ),

  on(MonthlyPaymentsActions.loadPaymentsError, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  })),

  on(MonthlyPaymentsActions.clean, (state) => ({
    monthlyPayments: [],
    loading: false,
    error: null,
  }))
);

export function monthlyPaymentsReducer(state: any, action: any) {
  return _monthlyPaymentsReducer(state, action);
}
