import { createAction, props } from '@ngrx/store';
import {
  ExtraContribution,
  ExtraContributionData,
  ExtraContributionPaid,
  ExtraContributionPayMade,
} from 'src/app/models/extra-contribution.interface';

export const loadAll = createAction(
  '[EXTRA-CONTRIBUTION] load all extra contributions'
);

export const loadAllSuccess = createAction(
  '[EXTRA-CONTRIBUTION] load all extra contributions success',
  props<{ data: ExtraContribution[] }>()
);

export const loadByUser = createAction(
  '[EXTRA-CONTRIBUTION] load extra contributions by user',
  props<{ id: number }>()
);

export const loadByUserSuccess = createAction(
  '[EXTRA-CONTRIBUTION] load extra contributions by user success',
  props<{ data: ExtraContributionPayMade[] }>()
);

export const loadOne = createAction(
  '[EXTRA-CONTRIBUTION] load one extra contribution',
  props<{ id: number }>()
);

export const loadOneSuccess = createAction(
  '[EXTRA-CONTRIBUTION] load one extra contribution success',
  props<{ data: ExtraContribution }>()
);

export const unSetCurrent = createAction(
  '[EXTRA-CONTRIBUTION] un set current extra contribution'
);

export const create = createAction(
  '[EXTRA-CONTRIBUTION] create an extra contribution',
  props<{ data: ExtraContributionData }>()
);

export const createSuccess = createAction(
  '[EXTRA-CONTRIBUTION] create an extra contribution success',
  props<{ data: ExtraContribution }>()
);

export const update = createAction(
  '[EXTRA-CONTRIBUTION] update an extra contribution',
  props<{ id: number; data: Omit<ExtraContributionData, 'amount'> }>()
);

export const updateSuccess = createAction(
  '[EXTRA-CONTRIBUTION] update an extra contribution success',
  props<{ data: ExtraContribution }>()
);

export const payment = createAction(
  '[EXTRA-CONTRIBUTION] payment an extra contribution',
  props<{ userId: number; contributionId: number }>()
);

export const paymentSuccess = createAction(
  '[EXTRA-CONTRIBUTION] payment an extra contribution success',
  props<{ data: ExtraContributionPaid }>()
);

export const setError = createAction(
  '[EXTRA-CONTRIBUTION] Set error',
  props<{ e: any }>()
);

export const partialClean = createAction(
  '[EXTRA-CONTRIBUTION] Set created and update to false'
);

export const clean = createAction(
  '[EXTRA-CONTRIBUTION] clean extra contribution store'
);
