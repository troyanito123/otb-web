import { createSelector } from '@ngrx/store'
import { AppState } from '@state/app.reducer'
import { UserState } from '@state/reducers/user.reducer'

const userFeature = (state: AppState) => state.user

export const selectedUser = createSelector(userFeature, (state: UserState) => state.user)
export const selectedUserLoading = createSelector(userFeature, (state: UserState) => state.loading)
export const selectedUserRemoved = createSelector(userFeature, (state: UserState) => state.removed)
export const selectedUserSaved = createSelector(userFeature, (state: UserState) => state.saved)
export const selectedUserError = createSelector(userFeature, (state: UserState) => state.error)
