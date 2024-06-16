import { createFeature, createReducer, on } from '@ngrx/store'
import { MonthlyPayment } from 'src/app/models/monthly-payment.model'
import { MonthlyPaymentActions } from '../actions/monthly-payment.action'

export interface MonthlyPaymentState {
  monthlyPayment: MonthlyPayment | null
  loading: boolean
  error: any
}

export const initialMonthlyPaymentState: MonthlyPaymentState = {
  monthlyPayment: null,
  loading: false,
  error: null,
}

const monthlyPaymentReducer = createReducer(
  initialMonthlyPaymentState,

  on(MonthlyPaymentActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MonthlyPaymentActions.saveOrLoadSuccess, (state, { monthlyPayment }) => ({
    ...state,
    loading: false,
    monthlyPayment,
  })),

  on(MonthlyPaymentActions.create, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MonthlyPaymentActions.update, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MonthlyPaymentActions.remove, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MonthlyPaymentActions.clean, () => ({
    monthlyPayment: null,
    loading: false,
    error: null,
  }))
)

export const monthlyPaymentFeature = createFeature({
  name: 'monthlyPayment',
  reducer: monthlyPaymentReducer,
})
