import { createReducer, on } from '@ngrx/store';
import { MonthlyPayment } from 'src/app/models/monthly-payment.model';
import * as MonthlyPaymentActions from '../actions/monthly-payment.action';

export interface MonthlyPaymentState {
  monthlyPayment: MonthlyPayment | null;
  loading: boolean;
  created: boolean;
  updated: boolean;
  removed: boolean;
  error: any;
}

export const initialMonthlyPaymentState: MonthlyPaymentState = {
  monthlyPayment: null,
  loading: false,
  created: false,
  updated: false,
  removed: false,
  error: null,
};

const _monthlyPaymentReducer = createReducer(
  initialMonthlyPaymentState,

  on(MonthlyPaymentActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MonthlyPaymentActions.loadSuccess, (state, { monthlyPayment }) => ({
    ...state,
    loading: false,
    monthlyPayment,
  })),

  on(MonthlyPaymentActions.create, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MonthlyPaymentActions.createSuccess, (state, { monthlyPayment }) => ({
    ...state,
    loading: false,
    monthlyPayment,
    created: true,
  })),

  on(MonthlyPaymentActions.update, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MonthlyPaymentActions.updateSuccess, (state, { monthlyPayment }) => ({
    ...state,
    loading: false,
    monthlyPayment,
    updated: true,
  })),

  on(MonthlyPaymentActions.remove, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MonthlyPaymentActions.removeSuccess, (state, { monthlyPayment }) => ({
    ...state,
    loading: false,
    monthlyPayment,
    removed: true,
  })),

  on(MonthlyPaymentActions.clean, () => ({
    monthlyPayment: null,
    loading: false,
    created: false,
    updated: false,
    removed: false,
    error: null,
  })),

  on(MonthlyPaymentActions.softClean, (state) => ({
    ...state,
    created: false,
    updated: false,
    removed: false,
    error: null,
  }))
);

export function monthlyPaymentReducer(state: any, action: any) {
  return _monthlyPaymentReducer(state, action);
}
