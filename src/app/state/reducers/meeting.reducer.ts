import { createFeature, createReducer, on } from '@ngrx/store'
import { Meeting } from 'src/app/models/meeting.model'
import { MeetingActions } from '../actions/meeting.actions'

export interface MeetingState {
  meeting: Meeting | null
  loading: boolean
  error: any
}

export const initialMeetingState: MeetingState = {
  meeting: null,
  loading: false,
  error: null,
}

const meetingReducer = createReducer(
  initialMeetingState,

  on(MeetingActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MeetingActions.loadSuccess, (state, { meeting }) => ({
    ...state,
    meeting,
    loading: false,
  })),

  on(MeetingActions.create, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MeetingActions.update, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MeetingActions.remove, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MeetingActions.error, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  })),

  on(MeetingActions.clean, () => ({
    meeting: null,
    loading: false,
    error: null,
  })),
)

export const meetingFeature = createFeature({ name: 'meeting', reducer: meetingReducer })
