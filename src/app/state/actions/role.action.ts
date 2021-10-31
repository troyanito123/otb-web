import { createAction, props } from '@ngrx/store';
import { Role } from 'src/app/models/role.model';

export const loadRoles = createAction('[ROLE] load');
export const loadSuccess = createAction(
  '[ROLE] load success',
  props<{ roles: Role[] }>()
);
export const loadError = createAction('[ROLE] load error', props<{ e: any }>());
