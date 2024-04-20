import { createFeature, createReducer, createSelector, on } from '@ngrx/store'
import {
  ExtraContribution,
  ExtraContributionPaid,
  ExtraContributionPayMade,
} from 'src/app/models/extra-contribution.interface'
import { ExtraContActions } from '../actions/extra-contribution.action'

export interface ExtraContributionState {
  extraContributions: ExtraContribution[]
  extraContribution: ExtraContribution | null
  extraContributionMade: ExtraContributionPayMade[]
  extraContributionPaid: ExtraContributionPaid | null
  loading: boolean
  error: any
}

export const initialExtraContributionState: ExtraContributionState = {
  extraContributions: [],
  extraContribution: null,
  extraContributionMade: [],
  extraContributionPaid: null,
  loading: false,
  error: null,
}

const extraContributionReducer = createReducer(
  initialExtraContributionState,

  on(ExtraContActions.loadAll, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ExtraContActions.loadAllSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    extraContributions: data,
  })),

  on(ExtraContActions.loadByUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ExtraContActions.loadByUserSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    extraContributionMade: data,
  })),

  on(ExtraContActions.loadOne, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ExtraContActions.loadOneSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    extraContribution: data,
  })),

  on(ExtraContActions.unSetCurrent, (state) => ({
    ...state,
    extraContribution: null,
  })),

  on(ExtraContActions.create, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(ExtraContActions.update, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(ExtraContActions.payment, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(ExtraContActions.paymentSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    extraContributionPaid: data,
  })),

  on(ExtraContActions.setError, (state, { e }) => ({
    ...state,
    loading: false,
    error: e,
  })),

  on(ExtraContActions.clean, () => ({
    extraContributions: [],
    extraContribution: null,
    extraContributionMade: [],
    extraContributionPaid: null,
    loading: false,
    error: null,
  }))
)

export const extraContributionFeature = createFeature({
  name: 'extraContributions',
  reducer: extraContributionReducer,
  extraSelectors: ({ selectExtraContribution }) => ({
    payments: createSelector(
      selectExtraContribution,
      (extraContribution) => extraContribution?.extra_contributions_paid ?? []
    ),
    total: createSelector(selectExtraContribution, (extraContribution) =>
      (extraContribution?.extra_contributions_paid ?? []).reduce(
        (counter, item) => counter + item.amount,
        0
      )
    ),
  }),
})
