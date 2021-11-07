import { createAction, props } from '@ngrx/store';
import { Attendence } from 'src/app/models/attendence.model';

export const loadByUser = createAction(
  '[ATTENDENCES] load attencendes',
  props<{ userId: number }>()
);
export const clean = createAction('[ATTENDENCES] clean attencendes');

export const load = createAction(
  '[ATTENDENCES] load success attencendes',
  props<{ attendences: Attendence[] }>()
);

export const error = createAction(
  '[ATTENDENCES] error on load attencendes',
  props<{ e: any }>()
);
