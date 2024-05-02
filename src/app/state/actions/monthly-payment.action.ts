import { createAction, props } from '@ngrx/store'
import { MonthlyPayment } from 'src/app/models/monthly-payment.model'

const load = createAction('[MONTHLY-PAYMENT] load monthly payment', props<{ id: number }>())

const create = createAction(
  '[MONTHLY-PAYMENT] create monthly payment',
  props<{ year: string; month: string; amount: number; forwardSupplier: (id: number) => string }>()
)

const saveOrLoadSuccess = createAction(
  '[MONTHLY-PAYMENT] save or load payment success',
  props<{ monthlyPayment: MonthlyPayment }>()
)

const update = createAction(
  '[MONTHLY-PAYMENT] update monthly payment',
  props<{
    id: number
    year: string
    month: string
    amount: number
    forwardSupplier: (id: number) => string
  }>()
)

const remove = createAction(
  '[MONTHLY-PAYMENT] remove monthly payment',
  props<{
    id: number
    forwardSupplier: () => string
    messageSupplier: () => string
  }>()
)

const error = createAction('[MONTHLY-PAYMENT] error', props<{ e: any }>())

const clean = createAction('[MONTHLY-PAYMENT] clean all monthly payment state')

export const MonthlyPaymentActions = {
  load,
  create,
  update,
  remove,
  saveOrLoadSuccess,
  error,
  clean,
}
