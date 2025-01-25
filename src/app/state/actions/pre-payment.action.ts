import { createAction, props } from '@ngrx/store'
import { PrePayment } from 'src/app/models/pre-payment'

const addPayment = createAction('[PRE_PAYMENT] add payment', props<{ prePayment: PrePayment }>())
const addManyPayment = createAction('[PRE_PAYMENT] add many payment', props<{ prePayments: PrePayment[] }>())

const subtractPayment = createAction('[PRE_PAYMENT] subtract payment', props<{ id: number }>())

const cleanPayment = createAction('[PRE_PAYMENT] clean payment')

export const PrePaymentActions = {
  addPayment,
  addManyPayment,
  subtractPayment,
  cleanPayment,
}
