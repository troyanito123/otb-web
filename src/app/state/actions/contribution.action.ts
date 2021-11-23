import { createAction, props } from '@ngrx/store';
import { Contribution } from 'src/app/models/contribution.model';

export const load = createAction(
  '[CONTRIBUTION] load contribution',
  props<{ id: number }>()
);

export const loadSuccess = createAction(
  '[CONTRIBUTION] load contribution success',
  props<{ contribution: Contribution }>()
);

export const create = createAction(
  '[CONTRIBUTION] create contribution',
  props<{ description: string; amount: number }>()
);

export const createSuccess = createAction(
  '[CONTRIBUTION] create contribution success',
  props<{ contribution: Contribution }>()
);

export const update = createAction(
  '[CONTRIBUTION] update contribution',
  props<{ id: number; description: string; amount: number }>()
);

export const updateSuccess = createAction(
  '[CONTRIBUTION] update contribution success',
  props<{ contribution: Contribution }>()
);

export const remove = createAction(
  '[CONTRIBUTION] remove contribution',
  props<{ id: number }>()
);

export const removeSuccess = createAction(
  '[CONTRIBUTION] remove contribution success',
  props<{ contribution: Contribution }>()
);

export const error = createAction('[CONTRIBUTION] error', props<{ e: any }>());

export const clean = createAction(
  '[CONTRIBUTION] clean all contribution state'
);
export const softClean = createAction(
  '[CONTRIBUTION] clean created updated removed'
);
