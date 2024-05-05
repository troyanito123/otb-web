import { createAction, props } from '@ngrx/store'
import { PDFInput } from '@services/print-table.service'
import { Report } from 'src/app/modules/reports/models/report.interface'

const getExtraContributionReportByDate = createAction(
  '[REPORT] get extra contribution report by date',
  props<{
    initDate: string
    endDate: string
    handlerCallback: (
      reports: Report[],
      initDate: string,
      endDate: string,
      reportType?: string
    ) => PDFInput
  }>()
)
const getExtraContributionReportByDateSuccess = createAction(
  '[REPORT] get extra contribution report by date success',
  props<{ report: Report[] }>()
)
const getIncomesReportByDate = createAction(
  '[REPORT] get incomes report by date',
  props<{
    initDate: string
    endDate: string
    handlerCallback: (
      reports: Report[],
      initDate: string,
      endDate: string,
      reportType?: string
    ) => PDFInput
  }>()
)
const getIncomesReportByDateSuccess = createAction(
  '[REPORT] get incomes report by date success',
  props<{ report: Report[] }>()
)

const setError = createAction('[REPORT] set error', props<{ e: any }>())
const clean = createAction('[REPORT] clean')

export const ReportActions = {
  getExtraContributionReportByDate,
  getExtraContributionReportByDateSuccess,
  getIncomesReportByDate,
  getIncomesReportByDateSuccess,
  setError,
  clean,
}
