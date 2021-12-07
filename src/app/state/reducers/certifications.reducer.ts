import { createReducer, on } from '@ngrx/store';
import { Certification } from 'src/app/models/certification.model';
import * as CertificationsActions from '../actions/certifications.action';

export interface CertificationsState {
  certifications: Certification[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialCertificationsState: CertificationsState = {
  certifications: [],
  loading: false,
  loaded: false,
  error: null,
};

const _certificationsReducer = createReducer(
  initialCertificationsState,

  on(CertificationsActions.load, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),

  on(CertificationsActions.loadByDate, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),

  on(CertificationsActions.loadSuccess, (state, { certifications }) => ({
    ...state,
    certifications,
    loaded: true,
    loading: false,
  })),

  on(CertificationsActions.error, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  })),

  on(CertificationsActions.clean, () => ({
    certifications: [],
    loading: false,
    loaded: false,
    error: null,
  }))
);

export function certificationsReducer(state: any, action: any) {
  return _certificationsReducer(state, action);
}
