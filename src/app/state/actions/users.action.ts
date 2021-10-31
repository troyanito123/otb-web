import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const load = createAction('[USER] load user');

export const loadSuccess = createAction(
  '[USERS] load success',
  props<{ users: User[] }>()
);
export const loadError = createAction('[USER] load error', props<{ e: any }>());
