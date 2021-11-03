import { createReducer, on } from '@ngrx/store';
import { ContributionPaid } from 'src/app/models/contribution-paid.model';
import * as ContributionsPaidActions from '../actions/contributions-paid.action';

export interface ContributionsPaidState {
  contributionsPaid: ContributionPaid[];
  loading: boolean;
  saved: boolean;
  error: any;
}

export const initialContributionsPaid: ContributionsPaidState = {
  contributionsPaid: [],
  loading: false,
  saved: false,
  error: null,
};

const _contributionsPaidReducer = createReducer(
  initialContributionsPaid,

  on(ContributionsPaidActions.loadContributionsPaid, (state) => ({
    ...state,
    loading: true,
    saved: false,
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
    saved: false,
    error: null,
  })),

  on(ContributionsPaidActions.createContributionsPaid, (state) => ({
    ...state,
    loading: true,
  })),

  on(
    ContributionsPaidActions.addContributionsPaid,
    (state, { contributionPaid }) => ({
      ...state,
      contributionsPaid: [...state.contributionsPaid, contributionPaid],
      saved: true,
      loading: false,
    })
  )
);

export function contributionsPaidReducer(state: any, action: any) {
  return _contributionsPaidReducer(state, action);
}
