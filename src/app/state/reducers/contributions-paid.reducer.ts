import { createReducer, on } from '@ngrx/store';
import { ContributionPaid } from 'src/app/models/contribution-paid.model';
import * as ContributionsPaidActions from '../actions/contributions-paid.action';

export interface ContributionsPaidState {
  contributionsPaid: ContributionPaid[];
  loading: boolean;
  error: any;
}

export const initialContributionsPaid: ContributionsPaidState = {
  contributionsPaid: [],
  loading: false,
  error: null,
};

const _contributionsPaidReducer = createReducer(
  initialContributionsPaid,

  on(ContributionsPaidActions.loadContributionsPaid, (state) => ({
    ...state,
    loading: true,
  })),

  on(
    ContributionsPaidActions.loadContributionsPaidSuccess,
    (state, { contributionsPaid }) => ({
      ...state,
      contributionsPaid,
      loading: false,
      error: null,
    })
  ),

  on(ContributionsPaidActions.loadContributionsPaidError, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  })),

  on(ContributionsPaidActions.cleanContributionsPaid, (state) => ({
    contributionsPaid: [],
    loading: false,
    error: null,
  }))
);

export function contributionsPaidReducer(state: any, action: any) {
  return _contributionsPaidReducer(state, action);
}
