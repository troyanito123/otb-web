import { createReducer, on } from '@ngrx/store';

import * as IncomeExpensesActions from '../actions/income-expenses.actions';

export interface IncomeExpensesState {
  contributions: number;
  monthlyPayments: number;
  certifications: number;
  fines: number;
  expenses: number;
  incomes: number;
  total: number;
  loading: boolean;
  error: any;
}

export const initialIncomeExpensesState: IncomeExpensesState = {
  contributions: 0,
  monthlyPayments: 0,
  certifications: 0,
  fines: 0,
  expenses: 0,
  incomes: 0,
  total: 0,
  loading: false,
  error: null,
};

const _incomeExpensesReducer = createReducer(
  initialIncomeExpensesState,

  on(IncomeExpensesActions.loadCertifications, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(IncomeExpensesActions.loadCertificationsSuccess, (state, { total }) => ({
    ...state,
    certifications: Number(total),
    incomes: state.incomes + Number(total),
    loading: false,
    total: state.incomes + Number(total) - state.expenses,
  })),

  on(IncomeExpensesActions.loadContribution, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(IncomeExpensesActions.loadContributionSuccess, (state, { total }) => ({
    ...state,
    contributions: Number(total),
    incomes: state.incomes + Number(total),
    loading: false,
    total: state.incomes + Number(total) - state.expenses,
  })),

  on(IncomeExpensesActions.loadMonthlyPayments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(IncomeExpensesActions.loadMonthlyPaymentSuccess, (state, { total }) => ({
    ...state,
    monthlyPayments: Number(total),
    incomes: state.incomes + Number(total),
    loading: false,
    total: state.incomes + Number(total) - state.expenses,
  })),

  on(IncomeExpensesActions.loadFines, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(IncomeExpensesActions.loadFinesSuccess, (state, { total }) => ({
    ...state,
    fines: Number(total),
    incomes: state.incomes + Number(total),
    loading: false,
    total: state.incomes + Number(total) - state.expenses,
  })),

  on(IncomeExpensesActions.loadExpenses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(IncomeExpensesActions.loadExpensesSuccess, (state, { total }) => ({
    ...state,
    expenses: Number(total),
    loading: false,
    total: state.incomes - (state.expenses + Number(total)),
  })),

  on(IncomeExpensesActions.error, (state, { e }) => ({
    ...state,
    error: e.error,
  })),

  on(IncomeExpensesActions.clean, (state) => ({
    contributions: 0,
    monthlyPayments: 0,
    certifications: 0,
    fines: 0,
    expenses: 0,
    incomes: 0,
    total: 0,
    loading: false,
    error: null,
  }))
);

export function incomeExpensesReducer(state: any, action: any) {
  return _incomeExpensesReducer(state, action);
}
