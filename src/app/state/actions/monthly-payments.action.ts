import { createAction, props } from '@ngrx/store'
import { MonthlyPayment } from 'src/app/models/monthly-payment.model'

const loadPayments = createAction('[PAYMENTS] load monthly payments', props<{ year: string }>())

const loadPaymentsSuccess = createAction(
  '[PAYMENTS] load monthly payments success',
  props<{ monthlyPayments: MonthlyPayment[] }>()
)
const loadPaymentsError = createAction(
  '[PAYMENTS] load monthly payments error',
  props<{ e: any }>()
)

const clean = createAction('[PAYMENTS] clean payments state')

export const MonthlyPaymentActions = {
  loadPayments,
  loadPaymentsSuccess,
  loadPaymentsError,
  clean,
}
