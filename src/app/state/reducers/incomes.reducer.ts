import { createReducer, on } from '@ngrx/store';
import { IncomeModel } from 'src/app/models/income.model';
import * as IncomesActions from '../actions/incomes.action';

export interface IncomeState {
  loading: boolean;
  saved: boolean;
  income?: IncomeModel;
  error?: any;
  incomes: IncomeModel[];
}

export const initialIncomeState: IncomeState = {
  loading: false,
  saved: false,
  incomes: [],
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

  on(IncomesActions.loadByUser, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),

  on(IncomesActions.loadByUserSuccess, (state, { incomes }) => ({
    ...state,
    loading: false,
    incomes,
  })),

  on(IncomesActions.create, (state) => ({
    ...state,
    error: undefined,
    loading: true,
  })),

  on(IncomesActions.update, (state) => ({
    ...state,
    error: undefined,
    loading: true,
  })),

  on(IncomesActions.setIncome, (state, { income }) => ({
    ...state,
    loading: false,
    saved: true,
    income,
  })),

  on(IncomesActions.setError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
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
    incomes: [],
  }))
);

export function incomeReducer(state: any, action: any) {
  return _incomeReducer(state, action);
}
