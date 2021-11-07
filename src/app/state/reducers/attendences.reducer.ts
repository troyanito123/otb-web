import { createReducer, on } from '@ngrx/store';
import { Attendence } from 'src/app/models/attendence.model';
import * as AttendencesActions from '../actions/attendences.actions';

export interface AttendencesState {
  attendences: Attendence[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialAttendencesState: AttendencesState = {
  attendences: [],
  loading: false,
  loaded: false,
  error: null,
};

const _attendencesReducer = createReducer(
  initialAttendencesState,

  on(AttendencesActions.loadByUser, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),

  on(AttendencesActions.clean, () => ({
    attendences: [],
    loaded: false,
    loading: false,
    error: null,
  })),

  on(AttendencesActions.load, (state, { attendences }) => ({
    ...state,
    attendences,
    loaded: true,
    loading: false,
  })),

  on(AttendencesActions.error, (state, { e }) => ({
    ...state,
    loaded: true,
    loading: false,
    error: e.error,
  }))
);

export function attendencesReducer(state: any, action: any) {
  return _attendencesReducer(state, action);
}
