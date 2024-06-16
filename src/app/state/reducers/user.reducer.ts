import { createFeature, createReducer, on } from '@ngrx/store'
import { User } from 'src/app/models/user.model'
import { UserActions } from '../actions/user.action'

export interface UserState {
  user: User | null
  loading: boolean
  error: any
}

export const initialUsersState: UserState = {
  user: null,
  loading: false,
  error: null,
}

const userReducer = createReducer(
  initialUsersState,

  on(UserActions.loadUser, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(UserActions.loadSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),

  on(UserActions.setError, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  })),

  on(UserActions.cleanUser, () => ({
    ...initialUsersState,
  })),

  on(UserActions.create, (state) => ({
    ...state,
    loading: true,
  })),

  on(UserActions.update, (state) => ({
    ...state,
    loading: true,
  })),

  on(UserActions.remove, (state) => ({
    ...state,
    loading: true,
  })),

  on(UserActions.modifySuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  }))
)

export const userFeature = createFeature({ name: 'user', reducer: userReducer })
