import { createAction, props } from '@ngrx/store'
import { User } from 'src/app/models/user.model'

const signin = createAction(
  '[AUTH] signin user',
  props<{ email: string; password: string; forward: string }>()
)

const signout = createAction('[AUTH] signout user', props<{ forward: string }>())

const renew = createAction('[AUTH] renew user', props<{ forward: string }>())

const setUser = createAction('[AUTH] Set user', props<{ user: User; access_token: string }>())

const unsetUser = createAction('[AUTH] unset user')

const setError = createAction('[AUTH] set error', props<{ e: any }>())

export const AuthActions = {
  signin,
  signout,
  renew,
  setUser,
  unsetUser,
  setError,
}
