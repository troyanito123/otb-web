import { createReducer, on } from '@ngrx/store';
import { Certification } from 'src/app/models/certification.model';
import * as CertificationActions from '../actions/certification.action';

export interface CertificationState {
  certification: Certification | null;
  loading: boolean;
  saved: boolean;
  error: any;
}

export const initialCertificationState: CertificationState = {
  certification: null,
  loading: false,
  saved: false,
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

  on(CertificationActions.error, (state, { e }) => ({
    ...state,
    loading: false,
    saved: false,
    error: e.error,
  })),

  on(CertificationActions.clean, () => ({
    certification: null,
    loading: false,
    saved: false,
    error: null,
  }))
);

export function certificationReducer(state: any, action: any) {
  return _certificationReducer(state, action);
}
