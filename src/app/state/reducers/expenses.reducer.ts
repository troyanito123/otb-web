import { createReducer, on } from '@ngrx/store';
import { Expense } from 'src/app/models/expense.model';
import * as ExpensesActions from '../actions/expenses.action';

export interface ExpensesState {
  expenses: Expense[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialExpensesState: ExpensesState = {
  expenses: [],
  loading: false,
  loaded: false,
  error: null,
};

const _expensesReducer = createReducer(
  initialExpensesState,

  on(ExpensesActions.load, (state) => ({
    ...state,
    loading: true,
    loded: false,
    error: null,
  })),

  on(ExpensesActions.loadSuccess, (state, { expenses }) => ({
    expenses,
    loading: false,
    loaded: true,
    error: null,
  })),

  on(ExpensesActions.error, (state, { e }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: e.error,
  })),

  on(ExpensesActions.clean, () => ({
    expenses: [],
    loading: false,
    loaded: false,
    error: null,
  }))
);

export function expensesReducer(state: any, action: any) {
  return _expensesReducer(state, action);
}
