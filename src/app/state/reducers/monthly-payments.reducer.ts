import { createFeature, createReducer, on } from '@ngrx/store'
import { MonthlyPayment } from 'src/app/models/monthly-payment.model'
import { MonthlyPaymentActions } from '../actions/monthly-payments.action'

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

  on(MonthlyPaymentActions.loadPayments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MonthlyPaymentActions.loadPaymentsSuccess, (state, { monthlyPayments }) => ({
    ...state,
    monthlyPayments,
    loading: false,
  })),

  on(MonthlyPaymentActions.loadPaymentsError, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  })),

  on(MonthlyPaymentActions.clean, () => ({
    ...initialMonthlyPayments,
  }))
)

export const monthlyPaymentsFeature = createFeature({
  name: 'monthlyPayments',
  reducer: monthlyPaymentsReducer,
})
