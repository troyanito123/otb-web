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
  '[CONTRIBUTIONS_PAID] clean paid contributions'
);
