import { createFeature, createReducer, createSelector, on } from '@ngrx/store'
import { PrePayment } from 'src/app/models/pre-payment'
import { PrePaymentActions } from '../actions/pre-payment.action'

export interface PrePaymentState {
  prePayments: PrePayment[]
}

export const initialPrePaymentState: PrePaymentState = {
  prePayments: [],
}

const prePaymentReducer = createReducer(
  initialPrePaymentState,

  on(PrePaymentActions.addPayment, (state, { prePayment }) => ({
    prePayments: state.prePayments.find((p) => p.id === prePayment.id)
      ? [...state.prePayments]
      : [...state.prePayments, prePayment],
  })),

  on(PrePaymentActions.subtractPayment, (state, { id }) => ({
    prePayments: state.prePayments.filter((p) => p.id !== id),
  })),

  on(PrePaymentActions.cleanPayment, () => ({
    prePayments: [],
  }))
)

export const prePaymentFeature = createFeature({
  name: 'prePayment',
  reducer: prePaymentReducer,
  extraSelectors: ({ selectPrePayments }) => ({
    selectPrePaymentTotal: createSelector(selectPrePayments, (prePayments) =>
      prePayments.reduce((counter, item) => counter + item.amountForPay, 0)
    ),
  }),
})
