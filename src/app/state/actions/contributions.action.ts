import { createAction, props } from '@ngrx/store';
import { Contribution } from 'src/app/models/contribution.model';

export const loadContributions = createAction(
  '[CONTRIBUTIONS] load contributions'
);

export const loadContributionsSuccess = createAction(
  '[CONTRIBUTIONS] load contributions success',
  props<{ contributions: Contribution[] }>()
);

export const loadContributionsError = createAction(
  '[CONTRIBUTIONS] load contributions error',
  props<{ e: any }>()
);

export const cleanContributions = createAction(
  '[CONTRIBUTIONS] clean contributions'
);
