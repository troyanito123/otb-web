import { createFeature, createReducer, on } from '@ngrx/store';
import { Meeting } from 'src/app/models/meeting.model';
import { MeetingsActions } from '../actions/meetings.actions';

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

const meetingsReducer = createReducer(
  initialMeetingsState,

  on(MeetingsActions.load, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),

  on(MeetingsActions.clean, () => ({
    meetings: [],
    loaded: false,
    loading: false,
    error: null,
  })),

  on(MeetingsActions.loadSuccess, (state, { meetings }) => ({
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

export const meetingsFeature = createFeature({ name: 'meetings', reducer: meetingsReducer })
