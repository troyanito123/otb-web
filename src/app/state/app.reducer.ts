import { ActionReducerMap } from '@ngrx/store'
import { attendencesFeature, AttendencesState } from './reducers/attendences.reducer'
import { expensesFeature, ExpensesState } from './reducers/expenses.reducer'
import { authFeature, AuthState } from './reducers/auth.reducer'
import { certificationFeature, CertificationState } from './reducers/certification.reducer'
import {
  contributionPaidFeature,
  ContributionsPaidState,
} from './reducers/contributions-paid.reducer'
import { contributionsFeature, ContributionsState } from './reducers/contributions.reducer'
import { meetingsFeature, MeetingsState } from './reducers/meetings.reducer'
import {
  MonthlyPaymentsMadeState,
  monthlyPaymentsMadeFeature,
} from './reducers/monthly-payments-made.reducer'
import { MonthlyPaymentsState, monthlyPaymentsFeature } from './reducers/monthly-payments.reducer'
import { preContributionFeature, PreContributionsState } from './reducers/pre-contribution.reducer'
import { prePaymentFeature, PrePaymentState } from './reducers/pre-payment.reducer'
import { transactionsFeature, TransactionsState } from './reducers/receipt.reducer'

import { roleFeature, RolesState } from './reducers/roles.reducer'
import { expenseFeature, ExpenseState } from './reducers/expense.reducer'
import { incomeExpensesFeature, IncomeExpensesState } from './reducers/income-expenses.reducer'
import { meetingFeature, MeetingState } from './reducers/meeting.reducer'
import { monthlyPaymentFeature, MonthlyPaymentState } from './reducers/monthly-payment.reducer'
import { contributionFeature, ContributionState } from './reducers/contribution.reducer'
import { finesFeature, FinesState } from './reducers/fines.reducer'
import { preFineFeature, PreFinesState } from './reducers/pre-fine.reducer'
import { certificationsFeature, CertificationsState } from './reducers/certifications.reducer'
import {
  extraContributionFeature,
  ExtraContributionState,
} from './reducers/extra-contribution.reducer'
import { incomesFeature, IncomeState } from './reducers/incomes.reducer'
import { reportFeature, ReportSate } from './reducers/reports.reducer'
import { userFeature, UserState } from './reducers/user.reducer'

export interface AppState {
  [authFeature.name]: AuthState
  [userFeature.name]: UserState
  [roleFeature.name]: RolesState
  [monthlyPaymentsFeature.name]: MonthlyPaymentsState
  [monthlyPaymentsMadeFeature.name]: MonthlyPaymentsMadeState
  [prePaymentFeature.name]: PrePaymentState
  [contributionsFeature.name]: ContributionsState
  [contributionPaidFeature.name]: ContributionsPaidState
  [preContributionFeature.name]: PreContributionsState
  [transactionsFeature.name]: TransactionsState
  [certificationFeature.name]: CertificationState
  [meetingsFeature.name]: MeetingsState
  [attendencesFeature.name]: AttendencesState
  [expensesFeature.name]: ExpensesState
  [expenseFeature.name]: ExpenseState
  [incomeExpensesFeature.name]: IncomeExpensesState
  [meetingFeature.name]: MeetingState
  [monthlyPaymentFeature.name]: MonthlyPaymentState
  [contributionFeature.name]: ContributionState
  [finesFeature.name]: FinesState
  [preFineFeature.name]: PreFinesState
  [certificationsFeature.name]: CertificationsState
  [extraContributionFeature.name]: ExtraContributionState
  [incomesFeature.name]: IncomeState
  [reportFeature.name]: ReportSate
}

export const appReducers: ActionReducerMap<AppState> = {
  [authFeature.name]: authFeature.reducer,
  [userFeature.name]: userFeature.reducer,
  [roleFeature.name]: roleFeature.reducer,
  [monthlyPaymentsFeature.name]: monthlyPaymentsFeature.reducer,
  [monthlyPaymentsMadeFeature.name]: monthlyPaymentsMadeFeature.reducer,
  [prePaymentFeature.name]: prePaymentFeature.reducer,
  [contributionsFeature.name]: contributionsFeature.reducer,
  [contributionPaidFeature.name]: contributionPaidFeature.reducer,
  [preContributionFeature.name]: preContributionFeature.reducer,
  [transactionsFeature.name]: transactionsFeature.reducer,
  [certificationFeature.name]: certificationFeature.reducer,
  [meetingsFeature.name]: meetingsFeature.reducer,
  [attendencesFeature.name]: attendencesFeature.reducer,
  [expensesFeature.name]: expensesFeature.reducer,
  [expenseFeature.name]: expenseFeature.reducer,
  [incomeExpensesFeature.name]: incomeExpensesFeature.reducer,
  [meetingFeature.name]: meetingFeature.reducer,
  [monthlyPaymentFeature.name]: monthlyPaymentFeature.reducer,
  [contributionFeature.name]: contributionFeature.reducer,
  [finesFeature.name]: finesFeature.reducer,
  [preFineFeature.name]: preFineFeature.reducer,
  [certificationsFeature.name]: certificationsFeature.reducer,
  [extraContributionFeature.name]: extraContributionFeature.reducer,
  [incomesFeature.name]: incomesFeature.reducer,
  [reportFeature.name]: reportFeature.reducer,
}
