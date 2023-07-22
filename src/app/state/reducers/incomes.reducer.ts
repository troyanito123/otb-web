import { createFeature, createReducer, on } from '@ngrx/store'
import { IncomeModel } from 'src/app/models/income.model'
import { IncomesActions } from '../actions/incomes.action'

export interface IncomeState {
  loading: boolean
  income: IncomeModel | null
  error: any
  incomes: IncomeModel[]
}

export const initialIncomeState: IncomeState = {
  loading: false,
  income: null,
  error: null,
  incomes: [],
}

const incomeReducer = createReducer(
  initialIncomeState,

  on(IncomesActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(IncomesActions.loadSuccess, (state, { income }) => ({
    ...state,
    loading: false,
    income,
  })),

  on(IncomesActions.loadByUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(IncomesActions.loadByUserSuccess, (state, { incomes }) => ({
    ...state,
    loading: false,
    incomes,
  })),

  on(IncomesActions.create, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(IncomesActions.update, (state) => ({
    ...state,
    error: null,
    loading: true,
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

  on(IncomesActions.clean, (state) => ({
    ...initialIncomeState,
  }))
)

export const incomesFeature = createFeature({ name: 'incomes', reducer: incomeReducer })
