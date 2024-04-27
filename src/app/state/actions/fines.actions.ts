import { PreFinesPaid } from '@models/pre-fines-paid.model'
import { Transaction } from '@models/transaction.model'
import { createAction, props } from '@ngrx/store'
import { Fine } from 'src/app/models/fine.model'

const loadAllFinesByUser = createAction('[FINES] load all meetings and fines')
const loadAllFinesByUserSuccess = createAction(
  '[FINES] load all meetings and fines success',
  props<{ allUserPreFines: PreFinesPaid[] }>()
)

const loadByDate = createAction(
  '[FINES] load all meetings by user fines',
  props<{ initDate: string; endDate: string }>()
)

const loadSuccess = createAction('[FINES] load fines by user success', props<{ fines: Fine[] }>())

const createMany = createAction(
  '[FINES] create many fines',
  props<{
    date: Date
    meetingIds: string
    transactions: Transaction[]
    forwardSupplier: (id?: number) => string
  }>()
)

const createManySuccess = createAction(
  '[FINES] create many fines success',
  props<{ fines: Fine[] }>()
)

const clean = createAction('[FINES] clean fines state')

const error = createAction('[FINES] error on fines state', props<{ e: any }>())

export const FinesActions = {
  loadAllFinesByUser,
  loadAllFinesByUserSuccess,
  loadByDate,
  loadSuccess,
  createMany,
  createManySuccess,
  clean,
  error,
}
