import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const load = createAction('[USER] load user');

export const loadSuccess = createAction(
  '[USER] load success',
  props<{ users: User[] }>()
);
export const loadError = createAction('[USER] load error', props<{ e: any }>());

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

export const createSuccess = createAction(
  '[USER] create success',
  props<{ user: User }>()
);
export const createError = createAction(
  '[USER] create error',
  props<{ e: any }>()
);
