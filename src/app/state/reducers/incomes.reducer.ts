import { createReducer, on } from '@ngrx/store';
import { IncomeModel } from 'src/app/models/income.model';
import * as IncomesActions from '../actions/incomes.action';

export interface IncomeState {
  loading: boolean;
  saved: boolean;
  income?: IncomeModel;
  error?: any;
}

export const initialIncomeState: IncomeState = {
  loading: false,
  saved: false,
};

const _incomeReducer = createReducer(
  initialIncomeState,

  on(IncomesActions.load, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),

  on(IncomesActions.loadSuccess, (state, { income }) => ({
    ...state,
    loading: false,
    income,
  })),

  on(IncomesActions.setIncome, (state, { income }) => ({
    ...state,
    loading: false,
    income,
  })),

  on(IncomesActions.setError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(IncomesActions.setSaved, (state) => ({
    ...state,
    saved: true,
  })),

  on(IncomesActions.unsetSaved, (state) => ({
    ...state,
    saved: false,
  })),

  on(IncomesActions.clean, (state) => ({
    income: undefined,
    error: undefined,
    saved: false,
    loading: false,
  }))
);

export function incomeReducer(state: any, action: any) {
  return _incomeReducer(state, action);
}
