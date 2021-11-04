import { createAction, props } from '@ngrx/store';
import { PreContribution } from 'src/app/models/pre-contributions';

export const addContributionPaid = createAction(
  '[CONTRIBUTION_PAID] add pre-contribution paid',
  props<{ preContribution: PreContribution }>()
);

export const substractContributionPaid = createAction(
  '[CONTRIBUTION_PAID] substract pre-contribution paid',
  props<{ preContribution: PreContribution }>()
);

export const clean = createAction(
  '[CONTRIBUTION_PAID] clean pre-contributions paid'
);
