import { createReducer, on } from '@ngrx/store';
import { MonthlyPaymentMade } from 'src/app/models/monthly-payment-made';
import * as MonthlyPaymentsMadeActions from '../actions/monthly-payments-made.action';

export interface MonthlyPaymentsMadeState {
  monthlyPaymentsMade: MonthlyPaymentMade[];
  loading: boolean;
  error: any;
}

export const initialMonthlyPaymentsMade: MonthlyPaymentsMadeState = {
  monthlyPaymentsMade: [],
  loading: false,
  error: null,
};

const _monthlyPaymentsMadeReducer = createReducer(
  initialMonthlyPaymentsMade,

  on(MonthlyPaymentsMadeActions.loadPaymentsMade, (state) => ({
    ...state,
    loading: true,
  })),

  on(
    MonthlyPaymentsMadeActions.loadPaymentsMadeSuccess,
    (state, { monthlyPaymentsMade }) => ({
      ...state,
      monthlyPaymentsMade,
      loading: false,
      error: null,
    })
  ),

  on(MonthlyPaymentsMadeActions.loadPaymentsMadeError, (state, { e }) => ({
    ...state,
    loading: false,
    error: e,
  }))
);

export function monthlyPaymentsMadeReducer(state: any, action: any) {
  return _monthlyPaymentsMadeReducer(state, action);
}
