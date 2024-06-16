import { createAction, props } from '@ngrx/store'
import { PreFinesPaid } from 'src/app/models/pre-fines-paid.model'

const addFinePaid = createAction('[PRE_FINE] add pre fine paid', props<{ preFine: PreFinesPaid }>())

const substractFinePaid = createAction(
  '[PRE_FINE] substract pre fine paid',
  props<{ preFine: PreFinesPaid }>()
)

const clean = createAction('[PRE_FINE] clean pre fines paid')

export const PreFinesActions = {
  addFinePaid,
  substractFinePaid,
  clean,
}
