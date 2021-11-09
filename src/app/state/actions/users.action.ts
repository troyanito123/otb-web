import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const load = createAction('[USERS] load users');

export const loadSuccess = createAction(
  '[USERS] load success',
  props<{ users: User[] }>()
);
export const loadError = createAction(
  '[USERS] load error',
  props<{ e: any }>()
);

export const clean = createAction('[USERS] clean users state');
