import { createAction, props } from '@ngrx/store'
import { Expense } from 'src/app/models/expense.model'

const load = createAction('[EXPENSE] load expense by id', props<{ id: number }>())

const create = createAction(
  '[EXPENSE] create expense',
  props<{
    description: string
    amount: number
    date: Date
    from_user: string
    to_user: string
    forwardSupplier: (id: number) => string
  }>()
)

const loadOrSaveSuccess = createAction(
  '[EXPENSE] load or save success success',
  props<{ expense: Expense }>()
)

const update = createAction(
  '[EXPENSE] update expense',
  props<{
    id: number
    description: string
    amount: number
    date: Date
    from_user: string
    to_user: string
    forwardSupplier: (id: number) => string
    messageSupplier: (expense: Expense) => string
  }>()
)

const remove = createAction(
  '[EXPENSE] remove expense',
  props<{
    id: number
    forwardSupplier: (id?: number) => string
    messageSupplier: (expense?: Expense) => string
  }>()
)

const error = createAction('[EXPENSE] error ocurred', props<{ e: any }>())

const clean = createAction('[EXPENSE] clean state')

export const ExpenseActions = {
  load,
  create,
  update,
  remove,
  loadOrSaveSuccess,
  error,
  clean,
}
