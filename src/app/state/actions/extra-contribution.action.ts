import { Transaction } from '@models/transaction.model'
import { createAction, props } from '@ngrx/store'
import {
  ExtraContribution,
  ExtraContributionData,
  ExtraContributionPaid,
  ExtraContributionPayMade,
} from 'src/app/models/extra-contribution.interface'

const loadAll = createAction('[EXTRA-CONTRIBUTION] load all extra contributions')

const loadAllSuccess = createAction(
  '[EXTRA-CONTRIBUTION] load all extra contributions success',
  props<{ data: ExtraContribution[] }>()
)

const loadOne = createAction(
  '[EXTRA-CONTRIBUTION] load one extra contribution',
  props<{ id: number }>()
)

const loadOneSuccess = createAction(
  '[EXTRA-CONTRIBUTION] load one extra contribution success',
  props<{ data: ExtraContribution }>()
)

const unSetCurrent = createAction('[EXTRA-CONTRIBUTION] un set current extra contribution')

const create = createAction(
  '[EXTRA-CONTRIBUTION] create an extra contribution',
  props<{ data: ExtraContributionData; forwardSupplier: (id: number) => string }>()
)

const update = createAction(
  '[EXTRA-CONTRIBUTION] update an extra contribution',
  props<{
    id: number
    data: Omit<ExtraContributionData, 'amount'>
    forwardSupplier: (id: number) => string
  }>()
)

const loadByUser = createAction('[EXTRA-CONTRIBUTION] load extra contributions by user')

const loadByUserSuccess = createAction(
  '[EXTRA-CONTRIBUTION] load extra contributions by user success',
  props<{ data: ExtraContributionPayMade[] }>()
)

const payment = createAction(
  '[EXTRA-CONTRIBUTION] payment an extra contribution',
  props<{
    contributionId: number
    generateTransactionsCallback: (contributionsPaid: ExtraContributionPaid) => Transaction[]
    forwardSupplier: (id: number) => string
  }>()
)

const setError = createAction('[EXTRA-CONTRIBUTION] Set error', props<{ e: any }>())

const clean = createAction('[EXTRA-CONTRIBUTION] clean extra contribution store')

export const ExtraContActions = {
  loadAll,
  loadAllSuccess,
  loadByUser,
  loadByUserSuccess,
  loadOne,
  loadOneSuccess,
  unSetCurrent,
  create,
  update,
  payment,
  setError,
  clean,
}
