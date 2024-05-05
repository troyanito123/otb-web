import { createFeature, createReducer, on } from '@ngrx/store'
import { Attendence } from 'src/app/models/attendence.model'
import { AttendencesActions } from '../actions/attendences.actions'
import { AttendenceMeeting } from '@models/attendence-meeting.mode'

export interface AttendencesState {
  attendences: Attendence[]
  userMeetingsAttendance: AttendenceMeeting[]
  loading: boolean
  error: any
}

export const initialAttendencesState: AttendencesState = {
  attendences: [],
  userMeetingsAttendance: [],
  loading: false,
  error: null,
}

const attendencesReducer = createReducer(
  initialAttendencesState,

  on(AttendencesActions.loadUserMeetingsAttendance, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AttendencesActions.loadUserMeetingsAttendanceSuccess, (state, { userMeetingsAttendance }) => ({
    ...state,
    userMeetingsAttendance,
    loading: false,
    error: null,
  })),

  on(AttendencesActions.loadByMeeting, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AttendencesActions.loadByMeetingSuccess, (state, { attendences }) => ({
    ...state,
    attendences,
    loading: false,
  })),

  on(AttendencesActions.clean, () => ({
    attendences: [],
    userMeetingsAttendance: [],
    loading: false,
    error: null,
  })),

  on(AttendencesActions.error, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  })),

  on(AttendencesActions.create, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AttendencesActions.createSuccess, (state, { attendence }) => ({
    ...state,
    userMeetingsAttendance: state.userMeetingsAttendance.map((uma) =>
      uma.id === attendence.meeting.id
        ? AttendenceMeeting.fromJson({ ...uma, fine_amount: 0, isPresent: 'SI' })
        : { ...uma }
    ),
    loading: false,
  }))
)

export const attendencesFeature = createFeature({
  name: 'attendences',
  reducer: attendencesReducer,
})
