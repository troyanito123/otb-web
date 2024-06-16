import { createAction, props } from '@ngrx/store'
import { PDFInput } from '@services/print-table.service'
import { Expense } from 'src/app/models/expense.model'

const load = createAction('[EXPENSES] load expenses')

const loadByDates = createAction(
  '[EXPENSES] load expenses by date',
  props<{
    initDate: string
    endDate: string
    handlerCallback: (contributions: Expense[], initDate: string, endDate: string) => PDFInput
  }>()
)

const loadSuccess = createAction(
  '[EXPENSES] load expenses success',
  props<{ expenses: Expense[] }>()
)

const error = createAction('[EXPENSES] error', props<{ e: any }>())

const clean = createAction('[EXPENSES] clean')

export const ExpensesActions = {
  load,
  loadByDates,
  loadSuccess,
  error,
  clean,
}
