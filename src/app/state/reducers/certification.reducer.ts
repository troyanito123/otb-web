import { createReducer, on } from '@ngrx/store';
import { Certification } from 'src/app/models/certification.model';
import * as CertificationActions from '../actions/certification.action';

export interface CertificationState {
  certification: Certification | null;
  loading: boolean;
  saved: boolean;
  updated: boolean;
  removed: boolean;
  error: any;
}

export const initialCertificationState: CertificationState = {
  certification: null,
  loading: false,
  saved: false,
  updated: false,
  removed: false,
  error: null,
};

const _certificationReducer = createReducer(
  initialCertificationState,

  on(CertificationActions.create, (state) => ({
    ...state,
    loading: true,
    saved: false,
    error: null,
  })),

  on(CertificationActions.createSuccess, (state, { certification }) => ({
    ...state,
    certification,
    loading: false,
    saved: true,
  })),

  on(CertificationActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CertificationActions.loadSuccess, (state, { certification }) => ({
    ...state,
    certification,
    loading: false,
  })),

  on(CertificationActions.update, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CertificationActions.updateSuccess, (state, { certification }) => ({
    ...state,
    certification,
    loading: false,
    updated: true,
  })),

  on(CertificationActions.remove, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CertificationActions.removeSuccess, (state, { certification }) => ({
    ...state,
    certification,
    loading: false,
    removed: true,
  })),

  on(CertificationActions.error, (state, { e }) => ({
    ...state,
    loading: false,
    saved: false,
    remoded: false,
    error: e.error,
  })),

  on(CertificationActions.clean, () => ({
    certification: null,
    loading: false,
    saved: false,
    updated: false,
    removed: false,
    error: null,
  })),

  on(CertificationActions.softClean, (state) => ({
    ...state,
    saved: false,
    updated: false,
    error: null,
  }))
);

export function certificationReducer(state: any, action: any) {
  return _certificationReducer(state, action);
}
