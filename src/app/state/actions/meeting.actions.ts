import { createAction, props } from '@ngrx/store'
import { Meeting, MeetingData } from 'src/app/models/meeting.model'

const load = createAction('[MEETING] load meeting', props<{ id: number }>())

const loadSuccess = createAction('[MEETING] load success meetings', props<{ meeting: Meeting }>())

const create = createAction(
  '[MEETING] create one meeting',
  props<{ data: MeetingData; forwardSupplier: (id: number) => string }>()
)

const update = createAction(
  '[MEETING] update one meeting',
  props<{ id: number; data: MeetingData; forwardSupplier: (id: number) => string }>()
)

const remove = createAction(
  '[MEETING] remove one meeting',
  props<{
    id: number
    forwardSupplier: (id?: number) => string
  }>()
)

const error = createAction('[MEETING] error on load meeting', props<{ e: any }>())

const clean = createAction('[MEETING] clean meeting')

export const MeetingActions = {
  load,
  loadSuccess,
  create,
  update,
  remove,
  error,
  clean,
}
