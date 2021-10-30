import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './reducers/auth.reducer';
import { usersReducer, UsersState } from './reducers/users.reducer';

export interface AppState {
  auth: AuthState;
  users: UsersState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  users: usersReducer,
};
