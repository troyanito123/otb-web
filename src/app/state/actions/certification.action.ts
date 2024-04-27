import { Transaction } from '@models/transaction.model'
import { createAction, props } from '@ngrx/store'
import { Certification, CertificationType } from 'src/app/models/certification.model'

const load = createAction('[CERTIFICATION] load certification', props<{ id: number }>())

const loadOrSaveSuccess = createAction(
  '[CERTIFICATION] load or save certification success',
  props<{ certification: Certification }>()
)

const create = createAction(
  '[CERTIFICATION] create one',
  props<{
    description: string
    amount: number
    ctype: CertificationType
    date: Date
    forwardSupplier: (id: number) => string
    transactionsCallback: (certification: Certification) => Transaction
  }>()
)

const update = createAction(
  '[CERTIFICATION] update certification one',
  props<{
    id: number
    description: string
    amount: number
    ctype: CertificationType
    date: Date
    forwardSupplier: (id?: number) => string
    messageSupplier: (certification: Certification) => string
  }>()
)

const remove = createAction(
  '[CERTIFICATION] remove certification one',
  props<{
    id: number
    forwardSupplier: (id?: number) => string
    messageSupplier: (certification: Certification) => string
  }>()
)

const error = createAction('[CERTIFICATION] catch error', props<{ e: any }>())

const clean = createAction('[CERTIFICATION] clean')

export const CertificationActions = {
  load,
  create,
  update,
  remove,
  loadOrSaveSuccess,
  error,
  clean,
}
