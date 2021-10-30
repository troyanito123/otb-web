import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { load, loadError, loadSuccess } from '../actions/users.action';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: any;
}

export const initialUsersState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const _usersReducer = createReducer(
  initialUsersState,

  on(load, () => ({
    users: [],
    loading: true,
    error: null,
  })),

  on(loadSuccess, (state, { users }) => ({
    users,
    loading: false,
    error: null,
  })),

  on(loadError, (state, { e }) => ({
    users: [],
    loading: false,
    error: e.error,
  }))
);

export function usersReducer(state: any, action: any) {
  return _usersReducer(state, action);
}
