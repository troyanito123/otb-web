import { createReducer, on } from '@ngrx/store';
import {
  ExtraContribution,
  ExtraContributionPaid,
  ExtraContributionPayMade,
} from 'src/app/models/extra-contribution.interface';
import * as ExtraContActions from '../actions/extra-contribution.action';

export interface ExtraContributionState {
  extraContributions: ExtraContribution[];
  extraContribution?: ExtraContribution;
  extraContributionMade: ExtraContributionPayMade[];
  extraContributionPaid?: ExtraContributionPaid;
  created: boolean;
  updated: boolean;
  loading: boolean;
  error?: any;
}

export const initialExtraContributionState: ExtraContributionState = {
  extraContributions: [],
  extraContributionMade: [],
  loading: false,
  created: false,
  updated: false,
};

const _extraContributionReducer = createReducer(
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
    extraContribution: undefined,
  })),

  on(ExtraContActions.create, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(ExtraContActions.createSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    created: true,
    extraContribution: data,
  })),

  on(ExtraContActions.update, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(ExtraContActions.updateSuccess, (state, { data }) => ({
    ...state,
    extraContribution: data,
    updated: true,
    loading: false,
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

  on(ExtraContActions.partialClean, (state) => ({
    ...state,
    updated: false,
    created: false,
  })),

  on(ExtraContActions.clean, () => ({
    extraContributions: [],
    extraContribution: undefined,
    extraContributionMade: [],
    extraContributionPaid: undefined,
    loading: false,
    error: undefined,
    created: false,
    updated: false,
  }))
);

export function extraContributionReducer(state: any, action: any) {
  return _extraContributionReducer(state, action);
}
