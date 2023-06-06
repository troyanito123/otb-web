import { createReducer, on } from '@ngrx/store';
import * as ReportActions from '../actions/reports.action';
import { Report } from 'src/app/modules/reports/models/report.interface';

export interface ReportSate {
  report: Report[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialReportSate: ReportSate = {
  report: [],
  loading: false,
  loaded: false,
  error: null,
};

const _reportReducer = createReducer(
  initialReportSate,

  on(ReportActions.getExtraContributionReportByDate, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),

  on(
    ReportActions.getExtraContributionReportByDateSuccess,
    (state, { report }) => ({
      ...state,
      loading: false,
      loaded: true,
      report: report,
      error: null,
    })
  ),
  on(ReportActions.getIncomesReportByDate, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),

  on(ReportActions.getIncomesReportByDateSuccess, (state, { report }) => ({
    loading: false,
    loaded: true,
    report: report,
    error: null,
  })),

  on(ReportActions.clean, () => ({
    report: [],
    loading: false,
    loaded: false,
    error: null,
  })),
  on(ReportActions.setError, (state, { e }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: e,
  }))
);

export function reportReducer(state: any, action: any) {
  return _reportReducer(state, action);
}
