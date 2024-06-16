import { createFeature, createReducer, on } from '@ngrx/store'
import { PreContribution } from 'src/app/models/pre-contributions'
import { PreContributionsActions } from '../actions/pre-constribution.action'

export interface PreContributionsState {
  preContributions: PreContribution[]
  total: number
}

export const initialPreContributionsState: PreContributionsState = {
  preContributions: [],
  total: 0,
}

const preContributionsReducer = createReducer(
  initialPreContributionsState,

  on(PreContributionsActions.addContributionPaid, (state, { preContribution }) => ({
    preContributions: state.preContributions.find((p) => p.id === preContribution.id)
      ? [...state.preContributions]
      : [...state.preContributions, preContribution],
    total: state.preContributions.find((p) => p.id === preContribution.id)
      ? state.total
      : state.total + preContribution.amountToPay,
  })),
  on(PreContributionsActions.substractContributionPaid, (state, { preContribution }) => ({
    preContributions: state.preContributions.filter((p) => p.id !== preContribution.id),
    total: state.total - preContribution.amountToPay,
  })),

  on(PreContributionsActions.clean, (state) => ({
    preContributions: [],
    total: 0,
  }))
)

export const preContributionFeature = createFeature({
  name: 'preContribution',
  reducer: preContributionsReducer,
})
