import { createFeature, createReducer, on } from '@ngrx/store'
import { Expense } from 'src/app/models/expense.model'
import { ExpensesActions } from '../actions/expenses.action'

export interface ExpensesState {
  expenses: Expense[]
  loading: boolean
  error: any
}

export const initialExpensesState: ExpensesState = {
  expenses: [],
  loading: false,
  error: null,
}

const expensesReducer = createReducer(
  initialExpensesState,

  on(ExpensesActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ExpensesActions.loadByDates, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ExpensesActions.loadSuccess, (state, { expenses }) => ({
    ...state,
    expenses,
    loading: false,
  })),

  on(ExpensesActions.error, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  })),

  on(ExpensesActions.clean, () => ({
    expenses: [],
    loading: false,
    error: null,
  }))
)

export const expensesFeature = createFeature({ name: 'expenses', reducer: expensesReducer })
