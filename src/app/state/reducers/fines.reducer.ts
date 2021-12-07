import { createReducer, on } from '@ngrx/store';
import { Fine } from 'src/app/models/fine.model';
import * as FinesActions from '../actions/fines.actions';

export interface FinesState {
  fines: Fine[];
  loading: boolean;
  saved: boolean;
  loaded: boolean;
  error: any;
}

export const initialFinesState: FinesState = {
  fines: [],
  loading: false,
  loaded: false,
  saved: false,
  error: null,
};

const _finesReducer = createReducer(
  initialFinesState,

  on(FinesActions.loadByUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(FinesActions.loadByDate, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),

  on(FinesActions.loadSuccess, (state, { fines }) => ({
    ...state,
    fines,
    loaded: true,
    loading: false,
  })),

  on(FinesActions.createMany, (state) => ({
    ...state,
    loading: true,
  })),

  on(FinesActions.createManySuccess, (state) => ({
    ...state,
    loading: false,
    saved: true,
  })),

  on(FinesActions.error, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  })),

  on(FinesActions.clean, () => ({
    fines: [],
    loading: false,
    loaded: false,
    saved: false,
    error: null,
  }))
);

export function finesReducer(state: any, action: any) {
  return _finesReducer(state, action);
}
