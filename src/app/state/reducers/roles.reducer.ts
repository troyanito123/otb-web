import { createReducer, on } from '@ngrx/store';
import { Role } from 'src/app/models/role.model';
import { loadRoles, loadSuccess, loadError } from '../actions/role.action';

export interface RolesState {
  roles: Role[];
  loading: boolean;
  error: any;
}

export const initialRolesState: RolesState = {
  roles: [],
  loading: false,
  error: null,
};

const _rolesReducer = createReducer(
  initialRolesState,

  on(loadRoles, (state) => ({
    ...state,
    loading: true,
  })),

  on(loadSuccess, (state, { roles }) => ({
    ...state,
    roles,
    loading: false,
    error: null,
  })),

  on(loadError, (state, { e }) => ({
    ...state,
    loading: false,
    error: true,
  }))
);

export function rolesReducer(state: any, action: any) {
  return _rolesReducer(state, action);
}
