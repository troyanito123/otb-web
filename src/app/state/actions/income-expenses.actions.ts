import { createAction, props } from '@ngrx/store'

const error = createAction('[INCOME-EXPENSES] error', props<{ e: any }>())

const clean = createAction('[INCOME-EXPENSES] clean')

const loadIncomesExpenses = createAction('[INCOME-EXPENSES] load al income expenses')

const loadIncomesExpensesSuccess = createAction(
  '[INCOME-EXPENSES] load al income expenses success',
  props<{
    contributions: number
    extraContributions: number
    monthlyPayments: number
    certifications: number
    incomesFromPeople: number
    fines: number
    expenses: number
  }>()
)

export const IncomeExpensesActions = {
  error,
  clean,
  loadIncomesExpenses,
  loadIncomesExpensesSuccess,
}
