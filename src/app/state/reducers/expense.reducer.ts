import { createReducer, on } from '@ngrx/store';
import { Expense } from 'src/app/models/expense.model';
import * as ExpenseActions from '../actions/expense.action';

export interface ExpenseState {
  expense: Expense | null;
  loading: boolean;
  created: boolean;
  updated: boolean;
  removed: boolean;
  error: any;
}

export const initialExpenseState: ExpenseState = {
  expense: null,
  loading: false,
  created: false,
  updated: false,
  removed: false,
  error: null,
};

const _expenseReducer = createReducer(
  initialExpenseState,

  on(ExpenseActions.load, (state) => ({
    ...state,
    loading: true,
    created: false,
    updated: false,
    removed: false,
    error: null,
  })),

  on(ExpenseActions.loadSuccess, (state, { expense }) => ({
    ...state,
    expense,
    loading: false,
  })),

  on(ExpenseActions.create, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ExpenseActions.createSuccess, (state, { expense }) => ({
    ...state,
    expense,
    loading: false,
    created: true,
  })),

  on(ExpenseActions.update, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ExpenseActions.updateSuccess, (state, { expense }) => ({
    ...state,
    expense,
    loading: false,
    updated: true,
  })),

  on(ExpenseActions.remove, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ExpenseActions.removeSuccess, (state, { expense }) => ({
    ...state,
    loading: false,
    removed: true,
  })),

  on(ExpenseActions.clean, () => ({
    expense: null,
    loading: false,
    created: false,
    updated: false,
    removed: false,
    error: null,
  }))
);

export function expenseReducer(state: any, action: any) {
  return _expenseReducer(state, action);
}
