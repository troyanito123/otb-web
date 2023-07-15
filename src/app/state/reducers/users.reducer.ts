import { createFeature, createReducer, on } from '@ngrx/store'
import { User } from 'src/app/models/user.model'
import { UsersActions } from '../actions/users.action'

export interface UsersState {
  users: User[]
  loading: boolean
  error: any
}

export const initialUsersState: UsersState = {
  users: [],
  loading: false,
  error: null,
}

const usersReducer = createReducer(
  initialUsersState,

  on(UsersActions.loadByBlock, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UsersActions.loadByBlockSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),

  on(UsersActions.loadError, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  })),

  on(UsersActions.clean, () => ({
    ...initialUsersState,
  }))
)

export const usersFeature = createFeature({ name: 'users', reducer: usersReducer })
