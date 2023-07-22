import { ActionReducerMap } from '@ngrx/store'
import { attendencesReducer, AttendencesState } from './reducers/attendences.reducer'
import { expensesReducer, ExpensesState } from './reducers/expenses.reducer'
import { authFeature, AuthState } from './reducers/auth.reducer'
import { certificationReducer, CertificationState } from './reducers/certification.reducer'
import {
  contributionsPaidReducer,
  ContributionsPaidState,
} from './reducers/contributions-paid.reducer'
import { contributionsReducer, ContributionsState } from './reducers/contributions.reducer'
import { meetingsReducer, MeetingsState } from './reducers/meetings.reducer'
import {
  MonthlyPaymentsMadeState,
  monthlyPaymentsMadeFeature,
} from './reducers/monthly-payments-made.reducer'
import { MonthlyPaymentsState, monthlyPaymentsFeature } from './reducers/monthly-payments.reducer'
import { preContributionsReducer, PreContributionsState } from './reducers/pre-contribution.reducer'
import { prePaymentFeature, PrePaymentState } from './reducers/pre-payment.reducer'
import { transactionsFeature, TransactionsState } from './reducers/receipt.reducer'

import { roleFeature, RolesState } from './reducers/roles.reducer'
import { expenseReducer, ExpenseState } from './reducers/expense.reducer'
import { incomeExpensesReducer, IncomeExpensesState } from './reducers/income-expenses.reducer'
import { meetingReducer, MeetingState } from './reducers/meeting.reducer'
import { monthlyPaymentReducer, MonthlyPaymentState } from './reducers/monthly-payment.reducer'
import { contributionReducer, ContributionState } from './reducers/contribution.reducer'
import { finesReducer, FinesState } from './reducers/fines.reducer'
import { preFinesReducer, PreFinesState } from './reducers/pre-fine.reducer'
import { certificationsReducer, CertificationsState } from './reducers/certifications.reducer'
import {
  extraContributionReducer,
  ExtraContributionState,
} from './reducers/extra-contribution.reducer'
import { incomesFeature ,IncomeState   } from './reducers/incomes.reducer'
import { reportReducer, ReportSate } from './reducers/reports.reducer'
import { userFeature, UserState } from './reducers/user.reducer'

export interface AppState {
  [authFeature.name]: AuthState
  [userFeature.name]: UserState
  [roleFeature.name]: RolesState
  [monthlyPaymentsFeature.name]: MonthlyPaymentsState
  [monthlyPaymentsMadeFeature.name]: MonthlyPaymentsMadeState
  [prePaymentFeature.name]: PrePaymentState
  contributions: ContributionsState
  contributionsPaid: ContributionsPaidState
  preContribution: PreContributionsState
  [transactionsFeature.name]: TransactionsState
  certification: CertificationState
  meetings: MeetingsState
  attendences: AttendencesState
  expenses: ExpensesState
  expense: ExpenseState
  incomeExpenses: IncomeExpensesState
  meeting: MeetingState
  monthlyPayment: MonthlyPaymentState
  contribution: ContributionState
  fines: FinesState
  preFines: PreFinesState
  certifications: CertificationsState
  extraContributions: ExtraContributionState
  [incomesFeature.name]: IncomeState
  report: ReportSate
}

export const appReducers: ActionReducerMap<AppState> = {
  [authFeature.name]: authFeature.reducer,
  [userFeature.name]: userFeature.reducer,
  [roleFeature.name]: roleFeature.reducer,
  [monthlyPaymentsFeature.name]: monthlyPaymentsFeature.reducer,
  [monthlyPaymentsMadeFeature.name]: monthlyPaymentsMadeFeature.reducer,
  [prePaymentFeature.name]: prePaymentFeature.reducer,
  contributions: contributionsReducer,
  contributionsPaid: contributionsPaidReducer,
  preContribution: preContributionsReducer,
  [transactionsFeature.name]: transactionsFeature.reducer,
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
  certifications: certificationsReducer,
  extraContributions: extraContributionReducer,
  incomes: incomesFeature.reducer,
  report: reportReducer,
}
