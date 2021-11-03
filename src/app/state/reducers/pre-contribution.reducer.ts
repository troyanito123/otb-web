import { createReducer, on } from '@ngrx/store';
import { PreContribution } from 'src/app/models/pre-contributions';
import * as PreContributionActions from '../actions/pre-constribution.action';

export interface PreContributionState {
  preContribution: PreContribution | null;
}

export const initialPreContributionState: PreContributionState = {
  preContribution: null,
};

const _preContributionReducer = createReducer(
  initialPreContributionState,

  on(
    PreContributionActions.setPreContribution,
    (state, { preContribution }) => ({
      preContribution,
    })
  ),

  on(PreContributionActions.unsetContribution, (state, {}) => ({
    preContribution: null,
  }))
);

export function preContributionReducer(state: any, action: any) {
  return _preContributionReducer(state, action);
}
