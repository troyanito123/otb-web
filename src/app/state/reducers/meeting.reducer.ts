import { createReducer, on } from '@ngrx/store';
import { Meeting } from 'src/app/models/meeting.model';
import * as MeetingActions from '../actions/meeting.actions';

export interface MeetingState {
  meeting: Meeting | null;
  loading: boolean;
  loaded: boolean;
  created: boolean;
  updated: boolean;
  removed: boolean;
  error: any;
}

export const initialMeetingState: MeetingState = {
  meeting: null,
  loading: false,
  loaded: false,
  created: false,
  updated: false,
  removed: false,
  error: null,
};

const _meetingReducer = createReducer(
  initialMeetingState,

  on(MeetingActions.load, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),

  on(MeetingActions.loadSucces, (state, { meeting }) => ({
    ...state,
    meeting,
    loaded: true,
    loading: false,
  })),

  on(MeetingActions.create, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),

  on(MeetingActions.createSuccess, (state, { meeting }) => ({
    ...state,
    meeting,
    loaded: true,
    created: true,
    loading: false,
  })),

  on(MeetingActions.update, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),

  on(MeetingActions.updateSuccess, (state, { meeting }) => ({
    ...state,
    meeting,
    updated: true,
    loaded: true,
    loading: false,
  })),

  on(MeetingActions.remove, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MeetingActions.removeSuccess, (state, { meeting }) => ({
    ...state,
    removed: true,
    loaded: true,
    loading: false,
  })),

  on(MeetingActions.error, (state, { e }) => ({
    ...state,
    loaded: true,
    loading: false,
    error: e.error,
  })),

  on(MeetingActions.clean, () => ({
    meeting: null,
    loaded: false,
    loading: false,
    created: false,
    updated: false,
    removed: false,
    error: null,
  })),

  on(MeetingActions.formClean, (state) => ({
    ...state,
    created: false,
    updated: false,
    error: null,
  }))
);

export function meetingReducer(state: any, action: any) {
  return _meetingReducer(state, action);
}
