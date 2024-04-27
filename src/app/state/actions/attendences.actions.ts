import { AttendenceMeeting } from '@models/attendence-meeting.mode'
import { createAction, props } from '@ngrx/store'
import { Attendence } from 'src/app/models/attendence.model'

const loadUserMeetingsAttendance = createAction(
  '[ATTENDENCES] load all meetings by user attendance',
)
const loadUserMeetingsAttendanceSuccess = createAction(
  '[ATTENDENCES] load all meetings by user attendance success',
  props<{ userMeetingsAttendance: AttendenceMeeting[] }>()
)

const clean = createAction('[ATTENDENCES] clean attencendes')

const create = createAction(
  '[ATTENDENCES] create one attencende',
  props<{ meetingId: number }>()
)

const createSuccess = createAction(
  '[ATTENDENCES] create success attencende',
  props<{ attendence: Attendence }>()
)

const error = createAction('[ATTENDENCES] error on load attencendes', props<{ e: any }>())

const loadByMeeting = createAction('[ATTENDENCES] loadByMeeting', props<{ meetingId: number }>())

const loadByMeetingSuccess = createAction(
  '[ATTENDENCES] loadByMeetingSuccess',
  props<{ attendences: Attendence[] }>()
)

export const AttendencesActions = {
  clean,
  create,
  createSuccess,
  error,
  loadByMeeting,
  loadByMeetingSuccess,
  loadUserMeetingsAttendance,
  loadUserMeetingsAttendanceSuccess,
}
