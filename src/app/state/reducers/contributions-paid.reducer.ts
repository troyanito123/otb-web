import { createFeature, createReducer, on } from '@ngrx/store'
import { ContributionPaid } from 'src/app/models/contribution-paid.model'
import { ContributionsPaidActions } from '../actions/contributions-paid.action'

export interface ContributionsPaidState {
  contributionsPaid: ContributionPaid[]
  loading: boolean
  error: any
}

export const initialContributionsPaid: ContributionsPaidState = {
  contributionsPaid: [],
  loading: false,
  error: null,
}

const contributionsPaidReducer = createReducer(
  initialContributionsPaid,

  on(ContributionsPaidActions.loadContributionsPaid, (state) => ({
    ...state,
    loading: true,
  })),

  on(ContributionsPaidActions.loadContributionsPaidByDate, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ContributionsPaidActions.loadContributionsPaidSuccess, (state, { contributionsPaid }) => ({
    ...state,
    contributionsPaid,
    loading: false,
  })),

  on(ContributionsPaidActions.loadContributionsPaidError, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  })),

  on(ContributionsPaidActions.cleanContributionsPaid, () => ({
    contributionsPaid: [],
    loading: false,
    error: null,
  })),

  on(ContributionsPaidActions.createContributionsPaid, (state) => ({
    ...state,
    loading: true,
  })),

  on(ContributionsPaidActions.addContributionsPaid, (state, { contributionPaid }) => ({
    ...state,
    contributionsPaid: [...state.contributionsPaid, contributionPaid],
    loading: false,
  })),

  on(ContributionsPaidActions.createManyContributionsPaid, (state) => ({
    ...state,
    loading: true,
  })),

  on(ContributionsPaidActions.addManyContributionsPaid, (state, { contributionsPaid }) => ({
    ...state,
    contributionsPaid: state.contributionsPaid.concat(contributionsPaid),
    loading: false,
  }))
)

export const contributionPaidFeature = createFeature({
  name: 'contributionsPaid',
  reducer: contributionsPaidReducer,
})
