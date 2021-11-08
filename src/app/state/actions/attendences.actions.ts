import { createAction, props } from '@ngrx/store';
import { Attendence } from 'src/app/models/attendence.model';

export const loadByUser = createAction(
  '[ATTENDENCES] load attencendes',
  props<{ userId: number }>()
);
export const clean = createAction('[ATTENDENCES] clean attencendes');

export const create = createAction(
  '[ATTENDENCES] create one attencende',
  props<{ userId: number; meetingId: number }>()
);

export const createSuccess = createAction(
  '[ATTENDENCES] create success attencende',
  props<{ attendence: Attendence }>()
);

export const load = createAction(
  '[ATTENDENCES] load success attencendes',
  props<{ attendences: Attendence[] }>()
);

export const error = createAction(
  '[ATTENDENCES] error on load attencendes',
  props<{ e: any }>()
);
