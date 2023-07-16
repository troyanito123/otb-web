import { createFeature, createReducer, on } from '@ngrx/store'
import { MonthlyPaymentMade } from 'src/app/models/monthly-payment-made'
import { MonthlyPaymentMadeActions } from '../actions/monthly-payments-made.action'

export interface MonthlyPaymentsMadeState {
  monthlyPaymentsMade: MonthlyPaymentMade[]
  loading: boolean
  saved: boolean
  loaded: boolean
  error: any
}

export const initialMonthlyPaymentsMade: MonthlyPaymentsMadeState = {
  monthlyPaymentsMade: [],
  loading: false,
  saved: false,
  loaded: false,
  error: null,
}

const monthlyPaymentsMadeReducer = createReducer(
  initialMonthlyPaymentsMade,

  on(MonthlyPaymentMadeActions.loadPaymentsMade, (state) => ({
    ...state,
    loading: true,
    saved: false,
    loaded: false,
  })),

  on(MonthlyPaymentMadeActions.loadByDate, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    saved: false,
  })),

  on(MonthlyPaymentMadeActions.loadPaymentsMadeSuccess, (state, { monthlyPaymentsMade }) => ({
    ...state,
    monthlyPaymentsMade,
    loaded: true,
    loading: false,
    error: null,
  })),

  on(MonthlyPaymentMadeActions.loadPaymentsMadeError, (state, { e }) => ({
    ...state,
    loading: false,
    error: e,
  })),

  on(MonthlyPaymentMadeActions.createManyPaymentsMade, (state) => ({
    ...state,
    loading: true,
    saved: false,
  })),

  on(MonthlyPaymentMadeActions.addPaymentsMade, (state, { monthlyPaymentsMade }) => ({
    ...state,
    monthlyPaymentsMade: state.monthlyPaymentsMade.concat(monthlyPaymentsMade),
    loading: false,
    saved: true,
  })),

  on(MonthlyPaymentMadeActions.clean, (state) => ({
    monthlyPaymentsMade: [],
    loading: false,
    saved: false,
    loaded: false,
    error: null,
  }))
)

export const monthlyPaymentsMadeFeature = createFeature({
  name: 'monthlyPaymentMade',
  reducer: monthlyPaymentsMadeReducer,
})
