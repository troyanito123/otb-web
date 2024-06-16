import { createFeature, createReducer, on } from '@ngrx/store';
import { Contribution } from 'src/app/models/contribution.model';
import {ContributionsActions} from '../actions/contributions.action';

export interface ContributionsState {
  contributions: Contribution[];
  loading: boolean;
  error: any;
}

export const initialContributions: ContributionsState = {
  contributions: [],
  loading: false,
  error: null,
};

const contributionsReducer = createReducer(
  initialContributions,

  on(ContributionsActions.loadContributions, (state) => ({
    ...state,
    loading: true,
  })),

  on(
    ContributionsActions.loadContributionsSuccess,
    (state, { contributions }) => ({
      ...state,
      contributions,
      loading: false,
      error: null,
    })
  ),

  on(ContributionsActions.loadContributionsError, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  })),

  on(ContributionsActions.cleanContributions, (state) => ({
    contributions: [],
    loading: false,
    error: null,
  }))
);

export const contributionsFeature = createFeature({name: 'contributions', reducer: contributionsReducer})