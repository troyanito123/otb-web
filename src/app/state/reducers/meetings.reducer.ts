import { createReducer, on } from '@ngrx/store';
import { Meeting } from 'src/app/models/meeting.model';
import * as MeetingsActions from '../actions/meetings.actions';

export interface MeetingsState {
  meetings: Meeting[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialMeetingsState: MeetingsState = {
  meetings: [],
  loading: false,
  loaded: false,
  error: null,
};

const _meetingsReducer = createReducer(
  initialMeetingsState,

  on(MeetingsActions.load, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),

  on(MeetingsActions.load, () => ({
    meetings: [],
    loaded: false,
    loading: false,
    error: null,
  })),

  on(MeetingsActions.loadSucces, (state, { meetings }) => ({
    ...state,
    meetings,
    loaded: true,
    loading: false,
  })),

  on(MeetingsActions.error, (state, { e }) => ({
    ...state,
    loaded: true,
    loading: false,
    error: e.error,
  }))
);

export function meetingsReducer(state: any, action: any) {
  return _meetingsReducer(state, action);
}
