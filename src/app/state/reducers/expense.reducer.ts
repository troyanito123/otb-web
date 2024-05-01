import { createFeature, createReducer, on } from '@ngrx/store'
import { Expense } from 'src/app/models/expense.model'
import { ExpenseActions } from '../actions/expense.action'

export interface ExpenseState {
  expense: Expense | null
  loading: boolean
  error: any
}

export const initialExpenseState: ExpenseState = {
  expense: null,
  loading: false,
  error: null,
}

const expenseReducer = createReducer(
  initialExpenseState,

  on(ExpenseActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ExpenseActions.create, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ExpenseActions.update, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ExpenseActions.remove, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ExpenseActions.loadOrSaveSuccess, (state, { expense }) => ({
    ...state,
    expense,
    loading: false,
  })),

  on(ExpenseActions.clean, () => ({
    expense: null,
    loading: false,
    error: null,
  }))
)

export const expenseFeature = createFeature({ name: 'expense', reducer: expenseReducer })
