import { createAction, props } from '@ngrx/store';
import { Meeting } from 'src/app/models/meeting.model';

export const load = createAction(
  '[MEETING] load meeting',
  props<{ id: number }>()
);

export const loadSucces = createAction(
  '[MEETING] load success meetings',
  props<{ meeting: Meeting }>()
);

export const create = createAction(
  '[MEETING] create one meeting',
  props<{
    name: string;
    description: string;
    date: Date;
    fine_amount: number;
    conclutions?: string;
  }>()
);

export const createSuccess = createAction(
  '[MEETING] create success meeting',
  props<{ meeting: Meeting }>()
);

export const update = createAction(
  '[MEETING] update one meeting',
  props<{
    id: number;
    name: string;
    description: string;
    date: Date;
    fine_amount: number;
    conclutions?: string;
  }>()
);

export const updateSuccess = createAction(
  '[MEETING] update success meeting',
  props<{ meeting: Meeting }>()
);

export const remove = createAction(
  '[MEETING] remove one meeting',
  props<{
    id: number;
  }>()
);

export const removeSuccess = createAction(
  '[MEETING] remove success meeting',
  props<{ meeting: Meeting }>()
);

export const error = createAction(
  '[MEETING] error on load meeting',
  props<{ e: any }>()
);

export const clean = createAction('[MEETING] clean meeting');
export const formClean = createAction('[MEETING] form clean');
