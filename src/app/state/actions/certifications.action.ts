import { createAction, props } from '@ngrx/store'
import { PDFInput } from '@services/print-table.service'
import { Certification } from 'src/app/models/certification.model'

const loadByDate = createAction(
  '[CERTIFICATIONS] load certifications by date',
  props<{
    initDate: string
    endDate: string
    handlerCallback: (contributions: Certification[], initDate: string, endDate: string) => PDFInput
  }>()
)

const loadSuccess = createAction(
  '[CERTIFICATIONS] load certifications success',
  props<{ certifications: Certification[] }>()
)

const error = createAction('[CERTIFICATIONS] catch error', props<{ e: any }>())

const clean = createAction('[CERTIFICATIONS] clean certifications state')

export const CertificationsActions = {
  loadByDate,
  loadSuccess,
  error,
  clean,
}
