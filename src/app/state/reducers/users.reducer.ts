import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as UsersActions from '../actions/users.action';

export interface UsersState {
  users: User[];
  loading: boolean;
  saveFinish: boolean;
  error: any;
}

export const initialUsersState: UsersState = {
  users: [],
  loading: false,
  saveFinish: false,
  error: null,
};

const _usersReducer = createReducer(
  initialUsersState,

  on(UsersActions.load, () => ({
    users: [],
    loading: true,
    saveFinish: false,
    error: null,
  })),

  on(UsersActions.loadSuccess, (state, { users }) => ({
    users,
    loading: false,
    saveFinish: false,
    error: null,
  })),

  on(UsersActions.loadError, (state, { e }) => ({
    users: [],
    loading: false,
    saveFinish: false,
    error: e.error,
  })),

  on(UsersActions.clean, () => ({
    users: [],
    loading: false,
    saveFinish: false,
    error: null,
  }))
);

export function usersReducer(state: any, action: any) {
  return _usersReducer(state, action);
}
