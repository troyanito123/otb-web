import { createAction, props } from '@ngrx/store'
import { IncomeModel } from 'src/app/models/income.model'

const load = createAction('[INCOMES] load income', props<{ id: number }>())

const loadByUser = createAction('[INCOMES] load by user')

const loadByUserSuccess = createAction(
  '[INCOMES] load by user success',
  props<{ incomes: IncomeModel[] }>()
)

const loadSuccess = createAction('[INCOMES] load income succes', props<{ income: IncomeModel }>())

const setIncome = createAction('[INCOMES] set income', props<{ income: IncomeModel }>())

const setError = createAction('[INCOMES] set error', props<{ error: any }>())

const create = createAction(
  '[INCOMES] create income',
  props<{
    amount: number
    description: string
    collector: string
    date: Date,
    forwardSupplier: (id: number) => string,
    messageSupplier: (text: string) => string
  }>()
)

const update = createAction(
  '[INCOMES] update income',
  props<{
    id: number
    amount: number
    description: string
    date: Date
    status: string,
    forwardSupplier: (id: number) => string,
    messageSupplier: (text: string) => string
  }>()
)

const clean = createAction('[INCOMES] clean')

export const IncomesActions = {
  load,
  loadByUser,
  loadByUserSuccess,
  loadSuccess,
  setIncome,
  setError,
  create,
  update,
  clean,
}
