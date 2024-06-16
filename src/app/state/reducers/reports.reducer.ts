import { createFeature, createReducer, on } from '@ngrx/store'
import { ReportActions } from '../actions/reports.action'
import { Report } from 'src/app/modules/reports/models/report.interface'

export interface ReportSate {
  report: Report[]
  loading: boolean
  error: any
}

export const initialReportSate: ReportSate = {
  report: [],
  loading: false,
  error: null,
}

const reportReducer = createReducer(
  initialReportSate,

  on(ReportActions.getExtraContributionReportByDate, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ReportActions.getExtraContributionReportByDateSuccess, (state, { report }) => ({
    ...state,
    loading: false,
    report: report,
    error: null,
  })),
  on(ReportActions.getIncomesReportByDate, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ReportActions.getIncomesReportByDateSuccess, (state, { report }) => ({
    loading: false,
    report: report,
    error: null,
  })),

  on(ReportActions.clean, () => ({
    report: [],
    loading: false,
    error: null,
  })),
  on(ReportActions.setError, (state, { e }) => ({
    ...state,
    loading: false,
    error: e,
  }))
)

export const reportFeature = createFeature({ name: 'report', reducer: reportReducer })
