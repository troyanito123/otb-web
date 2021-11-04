import { createReducer, on } from '@ngrx/store';
import { PreContribution } from 'src/app/models/pre-contributions';
import * as PreContributionActions from '../actions/pre-constribution.action';

export interface PreContributionsState {
  preContributions: PreContribution[];
  total: number;
}

export const initialPreContributionsState: PreContributionsState = {
  preContributions: [],
  total: 0,
};

const _preContributionsReducer = createReducer(
  initialPreContributionsState,

  on(
    PreContributionActions.addContributionPaid,
    (state, { preContribution }) => ({
      preContributions: state.preContributions.find(
        (p) => p.id === preContribution.id
      )
        ? [...state.preContributions]
        : [...state.preContributions, preContribution],
      total: state.preContributions.find((p) => p.id === preContribution.id)
        ? state.total
        : state.total + preContribution.amountToPay,
    })
  ),
  on(
    PreContributionActions.substractContributionPaid,
    (state, { preContribution }) => ({
      preContributions: state.preContributions.filter(
        (p) => p.id !== preContribution.id
      ),
      total: state.total - preContribution.amountToPay,
    })
  ),

  on(PreContributionActions.clean, (state) => ({
    preContributions: [],
    total: 0,
  }))
);

export function preContributionsReducer(state: any, action: any) {
  return _preContributionsReducer(state, action);
}
