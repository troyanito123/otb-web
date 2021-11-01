import { createReducer, on } from '@ngrx/store';
import { MonthlyPaymentMade } from 'src/app/models/monthly-payment-made';
import * as MonthlyPaymentsMadeActions from '../actions/monthly-payments-made.action';

export interface MonthlyPaymentsMadeState {
  monthlyPaymentsMade: MonthlyPaymentMade[];
  loading: boolean;
  saved: boolean;
  error: any;
}

export const initialMonthlyPaymentsMade: MonthlyPaymentsMadeState = {
  monthlyPaymentsMade: [],
  loading: false,
  saved: false,
  error: null,
};

const _monthlyPaymentsMadeReducer = createReducer(
  initialMonthlyPaymentsMade,

  on(MonthlyPaymentsMadeActions.loadPaymentsMade, (state) => ({
    ...state,
    loading: true,
    saved: false,
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
  })),

  on(MonthlyPaymentsMadeActions.createManyPaymentsMade, (state) => ({
    ...state,
    loading: true,
    saved: false,
  })),

  on(
    MonthlyPaymentsMadeActions.addPaymentsMade,
    (state, { monthlyPaymentsMade }) => ({
      ...state,
      monthlyPaymentsMade:
        state.monthlyPaymentsMade.concat(monthlyPaymentsMade),
      loading: false,
      saved: true,
    })
  )
);

export function monthlyPaymentsMadeReducer(state: any, action: any) {
  return _monthlyPaymentsMadeReducer(state, action);
}
