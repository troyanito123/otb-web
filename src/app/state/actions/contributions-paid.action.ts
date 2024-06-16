import { Transaction } from '@models/transaction.model'
import { createAction, props } from '@ngrx/store'
import { PDFInput } from '@services/print-table.service'
import { ContributionPaid } from 'src/app/models/contribution-paid.model'

const loadContributionsPaid = createAction('[CONTRIBUTIONS_PAID] load contributions paid')

const loadContributionsPaidByDate = createAction(
  '[CONTRIBUTIONS_PAID] load contributions paid by date',
  props<{
    initDate: string
    endDate: string
    handlerCallback: (
      contributions: ContributionPaid[],
      initDate: string,
      endDate: string
    ) => PDFInput
  }>()
)

const loadContributionsPaidSuccess = createAction(
  '[CONTRIBUTIONS_PAID] load contributions paid success',
  props<{ contributionsPaid: ContributionPaid[] }>()
)

const loadContributionsPaidError = createAction(
  '[CONTRIBUTIONS_PAID] load contributions paid error',
  props<{ e: any }>()
)

const cleanContributionsPaid = createAction('[CONTRIBUTIONS_PAID] clean contributions paid')

const createContributionsPaid = createAction(
  '[CONTRIBUTIONS_PAID] create contributions paid',
  props<{ amount: number; userId: number; contributionId: number }>()
)

const addContributionsPaid = createAction(
  '[CONTRIBUTIONS_PAID] Add contributions paid',
  props<{ contributionPaid: ContributionPaid }>()
)

const createManyContributionsPaid = createAction(
  '[CONTRIBUTIONS_PAID] create many contributions paid',
  props<{
    contributionsId: string
    date: Date
    generateTransactionsCallback: (contributionsPaid: ContributionPaid[]) => Transaction[]
    forwadSupplier: (id: number) => string
  }>()
)

const addManyContributionsPaid = createAction(
  '[CONTRIBUTIONS_PAID] Add many contributions paid',
  props<{
    contributionsPaid: ContributionPaid[]
    generateTransactionsCallback: (contributionsPaid: ContributionPaid[]) => Transaction[]
    forward: string
  }>()
)

export const ContributionsPaidActions = {
  loadContributionsPaid,
  loadContributionsPaidByDate,
  loadContributionsPaidSuccess,
  loadContributionsPaidError,
  cleanContributionsPaid,
  createContributionsPaid,
  addContributionsPaid,
  createManyContributionsPaid,
  addManyContributionsPaid,
}
