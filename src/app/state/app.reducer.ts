import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './reducers/auth.reducer';
import {
  MonthlyPayments,
  monthlyPaymentsReducer,
} from './reducers/monthly-payments.reducer';
import { rolesReducer, RolesState } from './reducers/roles.reducer';
import { userReducer, UserState } from './reducers/user.reducer';
import { usersReducer, UsersState } from './reducers/users.reducer';

export interface AppState {
  auth: AuthState;
  users: UsersState;
  user: UserState;
  roles: RolesState;
  monthlyPayment: MonthlyPayments;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  users: usersReducer,
  user: userReducer,
  roles: rolesReducer,
  monthlyPayment: monthlyPaymentsReducer,
};
