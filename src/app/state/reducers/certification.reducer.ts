import { createFeature, createReducer, on } from '@ngrx/store'
import { Certification } from 'src/app/models/certification.model'
import { CertificationActions } from '../actions/certification.action'

export interface CertificationState {
  certification: Certification | null
  loading: boolean
  error: any
}

export const initialCertificationState: CertificationState = {
  certification: null,
  loading: false,
  error: null,
}

const certificationReducer = createReducer(
  initialCertificationState,

  on(CertificationActions.create, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CertificationActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CertificationActions.update, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CertificationActions.remove, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CertificationActions.loadOrSaveSuccess, (state, { certification }) => ({
    ...state,
    loading: false,
    certification,
  })),

  on(CertificationActions.error, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  })),

  on(CertificationActions.clean, () => ({
    certification: null,
    loading: false,
    error: null,
  }))
)

export const certificationFeature = createFeature({
  name: 'certification',
  reducer: certificationReducer,
})
