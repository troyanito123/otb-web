import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './reducers/auth.reducer';
import {
  contributionsReducer,
  ContributionsState,
} from './reducers/contributions.reducer';
import {
  MonthlyPaymentsMadeState,
  monthlyPaymentsMadeReducer,
} from './reducers/monthly-payments-made.reducer';
import {
  MonthlyPaymentsState,
  monthlyPaymentsReducer,
} from './reducers/monthly-payments.reducer';
import {
  prePaymentReducer,
  PrePaymentState,
} from './reducers/pre-payment.reducer';
import { rolesReducer, RolesState } from './reducers/roles.reducer';
import { userReducer, UserState } from './reducers/user.reducer';
import { usersReducer, UsersState } from './reducers/users.reducer';

export interface AppState {
  auth: AuthState;
  users: UsersState;
  user: UserState;
  roles: RolesState;
  monthlyPayment: MonthlyPaymentsState;
  monthlyPaymentMade: MonthlyPaymentsMadeState;
  prePayment: PrePaymentState;
  contributions: ContributionsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  users: usersReducer,
  user: userReducer,
  roles: rolesReducer,
  monthlyPayment: monthlyPaymentsReducer,
  monthlyPaymentMade: monthlyPaymentsMadeReducer,
  prePayment: prePaymentReducer,
  contributions: contributionsReducer,
};
