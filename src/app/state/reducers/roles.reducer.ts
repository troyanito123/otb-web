import { createFeature, createReducer, on } from '@ngrx/store';
import { Role } from 'src/app/models/role.model';
import { RoleActions } from '../actions/role.action';

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

const rolesReducer = createReducer(
  initialRolesState,

  on(RoleActions.loadRoles, (state) => ({
    ...state,
    loading: true,
  })),

  on(RoleActions.loadSuccess, (state, { roles }) => ({
    ...state,
    roles,
    loading: false,
    error: null,
  })),

  on(RoleActions.loadError, (state, { e }) => ({
    ...state,
    loading: false,
    error: true,
  }))
);


export const roleFeature = createFeature({name: 'roleFeature', reducer: rolesReducer})
