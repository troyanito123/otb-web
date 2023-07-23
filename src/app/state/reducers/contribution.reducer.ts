import { createFeature, createReducer, on } from '@ngrx/store'
import { Contribution } from 'src/app/models/contribution.model'
import { ContributionActions } from '../actions/contribution.action'

export interface ContributionState {
  contribution: Contribution | null
  loading: boolean
  error: any
}

export const initialContributionState: ContributionState = {
  contribution: null,
  loading: false,
  error: null,
}

const contributionReducer = createReducer(
  initialContributionState,

  on(ContributionActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ContributionActions.create, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ContributionActions.update, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ContributionActions.remove, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ContributionActions.success, (state, { contribution }) => ({
    ...state,
    loading: false,
    contribution,
  })),

  on(ContributionActions.error, (state, { e }) => ({
    ...state,
    loading: false,
    error: e,
  })),

  on(ContributionActions.clean, () => ({
    contribution: null,
    loading: false,
    error: null,
  }))
)

export const contributionFeature = createFeature({
  name: 'contribution',
  reducer: contributionReducer,
})
