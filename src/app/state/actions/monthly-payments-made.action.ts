import { PrePayment } from '@models/pre-payment';
import { Transaction } from '@models/transaction.model';
import { createAction, props } from '@ngrx/store'
import { MonthlyPaymentMade } from 'src/app/models/monthly-payment-made'

const loadPaymentsMade = createAction(
  '[PAYMENTS_MADE] load monthly payments',
  props<{ year: string }>()
)

const loadByDate = createAction(
  '[PAYMENTS_MADE] load payments by date',
  props<{ initDate: string; endDate: string }>()
)

const loadPaymentsMadeSuccess = createAction(
  '[PAYMENTS_MADE] load monthly payments made success',
  props<{ monthlyPaymentsMade: MonthlyPaymentMade[] }>()
)
const loadPaymentsMadeError = createAction(
  '[PAYMENTS_MADE] load monthly payments made error',
  props<{ e: any }>()
)

const createManyPaymentsMade = createAction(
  '[PAYMENTS_MADE] Create many monthly payments',
  props<{ monthsId: string; date: Date, generateTransactionsCallbak: (prePayments: MonthlyPaymentMade[]) => Transaction[], forwardSupplier: (id: number) => string }>()
)

const addPaymentsMade = createAction(
  '[PAYMENTS_MADE] add monthly payments',
  props<{ monthlyPaymentsMade: MonthlyPaymentMade[], generateTransactionsCallbak: (prePayments: MonthlyPaymentMade[]) => Transaction[], forward: string }>()
)

const clean = createAction('[PAYMENTS_MADE] clean payments made state')

export const MonthlyPaymentMadeActions = {
  loadPaymentsMade,
  loadByDate,
  loadPaymentsMadeSuccess,
  loadPaymentsMadeError,
  createManyPaymentsMade,
  addPaymentsMade,
  clean,
}
