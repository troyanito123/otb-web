import { createReducer, on } from '@ngrx/store';
import { Contribution } from 'src/app/models/contribution.model';
import { MonthlyPayment } from 'src/app/models/monthly-payment.model';
import * as ContributionActions from '../actions/contribution.action';

export interface ContributionState {
  contribution: Contribution | null;
  loading: boolean;
  created: boolean;
  updated: boolean;
  removed: boolean;
  error: any;
}

export const initialContributionState: ContributionState = {
  contribution: null,
  loading: false,
  created: false,
  updated: false,
  removed: false,
  error: null,
};

const _contributionReducer = createReducer(
  initialContributionState,

  on(ContributionActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ContributionActions.loadSuccess, (state, { contribution }) => ({
    ...state,
    loading: false,
    contribution,
  })),

  on(ContributionActions.create, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ContributionActions.createSuccess, (state, { contribution }) => ({
    ...state,
    loading: false,
    contribution,
    created: true,
  })),

  on(ContributionActions.update, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ContributionActions.updateSuccess, (state, { contribution }) => ({
    ...state,
    loading: false,
    contribution,
    updated: true,
  })),

  on(ContributionActions.remove, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ContributionActions.removeSuccess, (state, { contribution }) => ({
    ...state,
    loading: false,
    contribution,
    removed: true,
  })),

  on(ContributionActions.clean, () => ({
    contribution: null,
    loading: false,
    created: false,
    updated: false,
    removed: false,
    error: null,
  })),

  on(ContributionActions.softClean, (state) => ({
    ...state,
    created: false,
    updated: false,
    removed: false,
    error: null,
  }))
);

export function contributionReducer(state: any, action: any) {
  return _contributionReducer(state, action);
}
