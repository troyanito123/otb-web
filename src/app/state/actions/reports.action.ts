import { createAction, props } from '@ngrx/store';
import { Report } from 'src/app/modules/reports/models/report.interface';

export const getExtraContributionReportByDate = createAction(
  '[REPORT] get extra contribution report by date',
  props<{ initDate: string; endDate: string }>()
);
export const getExtraContributionReportByDateSuccess = createAction(
  '[REPORT] get extra contribution report by date success',
  props<{ report: Report[] }>()
);
export const getIncomesReportByDate = createAction(
  '[REPORT] get incomes report by date',
  props<{ initDate: string; endDate: string }>()
);
export const getIncomesReportByDateSuccess = createAction(
  '[REPORT] get incomes report by date success',
  props<{ report: Report[] }>()
);

export const setError = createAction(
  '[REPORT] set error',
  props<{ e: any }>()
);
export const clean = createAction('[REPORT] clean');
