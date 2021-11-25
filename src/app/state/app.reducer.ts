import { ActionReducerMap } from '@ngrx/store';
import {
  attendencesReducer,
  AttendencesState,
} from './reducers/attendences.reducer';
import { expensesReducer, ExpensesState } from './reducers/expenses.reducer';
import { authReducer, AuthState } from './reducers/auth.reducer';
import {
  certificationReducer,
  CertificationState,
} from './reducers/certification.reducer';
import {
  contributionsPaidReducer,
  ContributionsPaidState,
} from './reducers/contributions-paid.reducer';
import {
  contributionsReducer,
  ContributionsState,
} from './reducers/contributions.reducer';
import { meetingsReducer, MeetingsState } from './reducers/meetings.reducer';
import {
  MonthlyPaymentsMadeState,
  monthlyPaymentsMadeReducer,
} from './reducers/monthly-payments-made.reducer';
import {
  MonthlyPaymentsState,
  monthlyPaymentsReducer,
} from './reducers/monthly-payments.reducer';
import {
  preContributionsReducer,
  PreContributionsState,
} from './reducers/pre-contribution.reducer';
import {
  prePaymentReducer,
  PrePaymentState,
} from './reducers/pre-payment.reducer';
import {
  transactionsReducer,
  TransactionsState,
} from './reducers/receipt.reducer';

import { rolesReducer, RolesState } from './reducers/roles.reducer';
import { userReducer, UserState } from './reducers/user.reducer';
import { usersReducer, UsersState } from './reducers/users.reducer';
import { expenseReducer, ExpenseState } from './reducers/expense.reducer';
import {
  incomeExpensesReducer,
  IncomeExpensesState,
} from './reducers/income-expenses.reducer';
import { meetingReducer, MeetingState } from './reducers/meeting.reducer';
import {
  monthlyPaymentReducer,
  MonthlyPaymentState,
} from './reducers/monthly-payment.reducer';
import {
  contributionReducer,
  ContributionState,
} from './reducers/contribution.reducer';
import { finesReducer, FinesState } from './reducers/fines.reducer';
import { preFinesReducer, PreFinesState } from './reducers/pre-fine.reducer';

export interface AppState {
  auth: AuthState;
  users: UsersState;
  user: UserState;
  roles: RolesState;
  monthlyPayments: MonthlyPaymentsState;
  monthlyPaymentMade: MonthlyPaymentsMadeState;
  prePayment: PrePaymentState;
  contributions: ContributionsState;
  contributionsPaid: ContributionsPaidState;
  preContribution: PreContributionsState;
  transactions: TransactionsState;
  certification: CertificationState;
  meetings: MeetingsState;
  attendences: AttendencesState;
  expenses: ExpensesState;
  expense: ExpenseState;
  incomeExpenses: IncomeExpensesState;
  meeting: MeetingState;
  monthlyPayment: MonthlyPaymentState;
  contribution: ContributionState;
  fines: FinesState;
  preFines: PreFinesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  users: usersReducer,
  user: userReducer,
  roles: rolesReducer,
  monthlyPayments: monthlyPaymentsReducer,
  monthlyPaymentMade: monthlyPaymentsMadeReducer,
  prePayment: prePaymentReducer,
  contributions: contributionsReducer,
  contributionsPaid: contributionsPaidReducer,
  preContribution: preContributionsReducer,
  transactions: transactionsReducer,
  certification: certificationReducer,
  meetings: meetingsReducer,
  attendences: attendencesReducer,
  expenses: expensesReducer,
  expense: expenseReducer,
  incomeExpenses: incomeExpensesReducer,
  meeting: meetingReducer,
  monthlyPayment: monthlyPaymentReducer,
  contribution: contributionReducer,
  fines: finesReducer,
  preFines: preFinesReducer,
};
