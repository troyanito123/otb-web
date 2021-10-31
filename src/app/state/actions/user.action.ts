import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const loadUser = createAction('[USER] load', props<{ id: number }>());
export const loadSuccess = createAction(
  '[USER] load success',
  props<{ user: User }>()
);
export const loadError = createAction('[USER] load error', props<{ e: any }>());
export const cleanUser = createAction('[USER] clean');

export const create = createAction(
  '[USER] create',
  props<{
    name: string;
    email: string;
    password: string;
    identification_number: string;
    block_number: string;
    address_number: string;
  }>()
);

export const update = createAction(
  '[USER] update',
  props<{
    id: number;
    name: string;
    email: string;
    identification_number: string;
    block_number: string;
    address_number: string;
    status: string;
    role: string;
  }>()
);

export const saveSuccess = createAction(
  '[USER] create success',
  props<{ user: User }>()
);
export const saveError = createAction(
  '[USER] create error',
  props<{ e: any }>()
);
