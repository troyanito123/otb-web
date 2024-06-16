import { createFeature, createReducer, on } from '@ngrx/store'
import { MonthlyPaymentMade } from 'src/app/models/monthly-payment-made'
import { MonthlyPaymentsMadeActions } from '../actions/monthly-payments-made.action'

export interface MonthlyPaymentsMadeState {
  monthlyPaymentsMade: MonthlyPaymentMade[]
  loading: boolean

  error: any
}

export const initialMonthlyPaymentsMade: MonthlyPaymentsMadeState = {
  monthlyPaymentsMade: [],
  loading: false,


  error: null,
}

const monthlyPaymentsMadeReducer = createReducer(
  initialMonthlyPaymentsMade,

  on(MonthlyPaymentsMadeActions.loadPaymentsMade, (state) => ({
    ...state,
    loading: true,


  })),

  on(MonthlyPaymentsMadeActions.loadByDate, (state) => ({
    ...state,
    error: null,
    loading: true,


  })),

  on(MonthlyPaymentsMadeActions.loadPaymentsMadeSuccess, (state, { monthlyPaymentsMade }) => ({
    ...state,
    monthlyPaymentsMade,
    loading: false,

  })),

  on(MonthlyPaymentsMadeActions.loadPaymentsMadeError, (state, { e }) => ({
    ...state,
    loading: false,
    error: e,
  })),

  on(MonthlyPaymentsMadeActions.createManyPaymentsMade, (state) => ({
    ...state,
    loading: true,
  })),

  on(MonthlyPaymentsMadeActions.addPaymentsMade, (state, { monthlyPaymentsMade }) => ({
    ...state,
    monthlyPaymentsMade: state.monthlyPaymentsMade.concat(monthlyPaymentsMade),
    loading: false,
  })),

  on(MonthlyPaymentsMadeActions.clean, (state) => ({
    monthlyPaymentsMade: [],
    loading: false,
    error: null,
  }))
)

export const monthlyPaymentsMadeFeature = createFeature({
  name: 'monthlyPaymentMade',
  reducer: monthlyPaymentsMadeReducer,
})
