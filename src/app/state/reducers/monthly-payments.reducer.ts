import { createFeature, createReducer, on } from '@ngrx/store'
import { MonthlyPayment } from 'src/app/models/monthly-payment.model'
import { MonthlyPaymentsActions } from '../actions/monthly-payments.action'

export interface MonthlyPaymentsState {
  monthlyPayments: MonthlyPayment[]
  loading: boolean
  error: any
}

const initialMonthlyPayments: MonthlyPaymentsState = {
  monthlyPayments: [],
  loading: false,
  error: null,
}

const monthlyPaymentsReducer = createReducer(
  initialMonthlyPayments,

  on(MonthlyPaymentsActions.loadPayments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MonthlyPaymentsActions.loadPaymentsSuccess, (state, { monthlyPayments }) => ({
    ...state,
    monthlyPayments,
    loading: false,
  })),

  on(MonthlyPaymentsActions.loadPaymentsError, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  })),

  on(MonthlyPaymentsActions.clean, () => ({
    ...initialMonthlyPayments,
  }))
)

export const monthlyPaymentsFeature = createFeature({
  name: 'monthlyPayments',
  reducer: monthlyPaymentsReducer,
})
