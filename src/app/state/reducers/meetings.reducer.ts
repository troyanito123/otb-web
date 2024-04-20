import { createFeature, createReducer, on } from '@ngrx/store';
import { Meeting } from 'src/app/models/meeting.model';
import { MeetingsActions } from '../actions/meetings.actions';

export interface MeetingsState {
  meetings: Meeting[];
  loading: boolean;
  error: any;
}

export const initialMeetingsState: MeetingsState = {
  meetings: [],
  loading: false,
  error: null,
};

const meetingsReducer = createReducer(
  initialMeetingsState,

  on(MeetingsActions.load, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MeetingsActions.clean, () => ({
    meetings: [],
    loading: false,
    error: null,
  })),

  on(MeetingsActions.loadSuccess, (state, { meetings }) => ({
    ...state,
    meetings,
    loading: false,
  })),

  on(MeetingsActions.error, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  }))
);

export const meetingsFeature = createFeature({ name: 'meetings', reducer: meetingsReducer })
