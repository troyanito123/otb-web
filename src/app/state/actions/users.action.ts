import { createAction, props } from '@ngrx/store'
import { User } from 'src/app/models/user.model'

const loadByBlock = createAction('[USERS] load users by block', props<{ block: string }>())
const loadError = createAction('[USERS] load error', props<{ e: any }>())


const loadByBlockSuccess = createAction(
  '[USERS] load users by block success',
  props<{ users: User[] }>()
)

const clean = createAction('[USERS] clean users state')

export const UsersActions = {
  loadError,
  loadByBlock,
  loadByBlockSuccess,
  clean,
}
