import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import {
  loadUser,
  loadSuccess,
  loadError,
  cleanUser,
  create,
  update,
  saveSuccess,
  saveError,
} from '../actions/user.action';

export interface UserState {
  user: User | null;
  loading: boolean;
  saved: boolean;
  error: any;
}

export const initialUsersState: UserState = {
  user: null,
  loading: false,
  saved: false,
  error: null,
};

const _userReducer = createReducer(
  initialUsersState,

  on(loadUser, (state, { id }) => ({
    ...state,
    loading: true,
  })),

  on(loadSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),

  on(loadError, (state, { e }) => ({
    ...state,
    user: null,
    loading: false,
    error: e.error,
  })),

  on(cleanUser, () => ({
    user: null,
    loading: false,
    saved: false,
    error: null,
  })),

  on(create, (state) => ({
    ...state,
    loading: true,
  })),

  on(update, (state) => ({
    ...state,
    loading: true,
  })),

  on(saveSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    saved: true,
  })),

  on(saveError, (state, { e }) => ({
    ...state,
    loading: false,
    saved: false,
    error: e.error,
  }))
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
