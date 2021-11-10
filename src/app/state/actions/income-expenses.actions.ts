import { createAction, props } from '@ngrx/store';

export const loadContribution = createAction(
  '[INCOME-EXPENSES] load contribution'
);

export const loadContributionSuccess = createAction(
  '[INCOME-EXPENSES] load contribution success',
  props<{ total: string }>()
);

export const loadMonthlyPayments = createAction(
  '[INCOME-EXPENSES] load monthly payments'
);

export const loadMonthlyPaymentSuccess = createAction(
  '[INCOME-EXPENSES] load MonthlyPayment success',
  props<{ total: string }>()
);

export const loadCertifications = createAction(
  '[INCOME-EXPENSES] load certifications'
);

export const loadCertificationsSuccess = createAction(
  '[INCOME-EXPENSES] load Certifications success',
  props<{ total: string }>()
);

export const loadExpenses = createAction('[INCOME-EXPENSES] load expenses');

export const loadExpensesSuccess = createAction(
  '[INCOME-EXPENSES] load Expenses success',
  props<{ total: string }>()
);

export const error = createAction(
  '[INCOME-EXPENSES] error',
  props<{ e: any }>()
);

export const clean = createAction('[INCOME-EXPENSES] clean');
