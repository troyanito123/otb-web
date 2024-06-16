import { createFeature, createReducer, on } from '@ngrx/store'
import { Certification } from 'src/app/models/certification.model'
import { CertificationsActions } from '../actions/certifications.action'

export interface CertificationsState {
  certifications: Certification[]
  loading: boolean
  error: any
}

export const initialCertificationsState: CertificationsState = {
  certifications: [],
  loading: false,
  error: null,
}

const certificationsReducer = createReducer(
  initialCertificationsState,

  on(CertificationsActions.loadByDate, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CertificationsActions.loadSuccess, (state, { certifications }) => ({
    ...state,
    certifications,
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
    error: null,
  }))
)

export const certificationsFeature = createFeature({
  name: 'certifications',
  reducer: certificationsReducer,
})
