import { createAction, props } from '@ngrx/store';
import { ContributionPaid } from 'src/app/models/contribution-paid.model';

export const loadContributionsPaid = createAction(
  '[CONTRIBUTIONS_PAID] load contributions paid',
  props<{ userId: number }>()
);

export const loadContributionsPaidSuccess = createAction(
  '[CONTRIBUTIONS_PAID] load contributions paid success',
  props<{ contributionsPaid: ContributionPaid[] }>()
);

export const loadContributionsPaidError = createAction(
  '[CONTRIBUTIONS_PAID] load contributions paid error',
  props<{ e: any }>()
);

export const cleanContributionsPaid = createAction(
  '[CONTRIBUTIONS_PAID] clean contributions paid'
);

export const createContributionsPaid = createAction(
  '[CONTRIBUTIONS_PAID] create contributions paid',
  props<{ amount: number; userId: number; contributionId: number }>()
);

export const addContributionsPaid = createAction(
  '[CONTRIBUTIONS_PAID] Add contributions paid',
  props<{ contributionPaid: ContributionPaid }>()
);

export const createManyContributionsPaid = createAction(
  '[CONTRIBUTIONS_PAID] create many contributions paid',
  props<{ userId: number; contributionsId: string; date: Date }>()
);

export const addManyContributionsPaid = createAction(
  '[CONTRIBUTIONS_PAID] Add many contributions paid',
  props<{ contributionsPaid: ContributionPaid[] }>()
);
