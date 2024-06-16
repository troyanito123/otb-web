import { createAction, props } from '@ngrx/store'
import { Contribution } from 'src/app/models/contribution.model'

const load = createAction('[CONTRIBUTION] load contribution', props<{ id: number }>())

const create = createAction(
  '[CONTRIBUTION] create contribution',
  props<{
    description: string
    amount: number
    forwardSupplier: (id: number) => string
    messageSupplier: (text: string) => string
  }>()
)

const update = createAction(
  '[CONTRIBUTION] update contribution',
  props<{
    id: number
    description: string
    amount: number
    forwardSupplier: (id: number) => string
    messageSupplier: (text: string) => string
  }>()
)

const remove = createAction(
  '[CONTRIBUTION] remove contribution',
  props<{ id: number; forward: string; messageSupplier: (text: string) => string }>()
)

const success = createAction(
  '[CONTRIBUTION] Set contribution',
  props<{ contribution: Contribution }>()
)

const error = createAction('[CONTRIBUTION] Set error', props<{ e: any }>())

const clean = createAction('[CONTRIBUTION] Clear')

export const ContributionActions = {
  load,
  success,
  create,
  update,
  remove,
  error,
  clean,
}
