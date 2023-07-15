import { createFeature, createReducer, on } from '@ngrx/store'
import { User } from 'src/app/models/user.model'
import { AuthActions } from '../actions/auth.action'

export interface AuthState {
  user: User | null
  access_token: string | null
  loading: boolean
  error: any
}

export const initialAuthState: AuthState = {
  user: null,
  access_token: null,
  loading: false,
  error: null,
}

const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.signin, () => ({
    user: null,
    access_token: null,
    loading: true,
    error: null,
  })),

  on(AuthActions.setUser, (state, { user, access_token }) => ({
    user,
    access_token,
    loading: false,
    error: null,
  })),

  on(AuthActions.setError, (state, { e }) => ({
    user: null,
    access_token: null,
    loading: false,
    error: e.error,
  })),

  on(AuthActions.signout, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.renew, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.unsetUser, () => ({
    user: null,
    access_token: null,
    loading: false,
    error: null,
  }))
)

export const authFeature = createFeature({ name: 'auth', reducer: authReducer })
