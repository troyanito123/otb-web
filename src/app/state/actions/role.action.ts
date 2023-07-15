import { createAction, props } from '@ngrx/store'
import { Role } from 'src/app/models/role.model'

const loadRoles = createAction('[ROLE] load')
const loadSuccess = createAction('[ROLE] load success', props<{ roles: Role[] }>())
const loadError = createAction('[ROLE] load error', props<{ e: any }>())

export const RoleActions = {
  loadRoles,
  loadSuccess,
  loadError,
}
