import { createSelector } from '@ngrx/store'
import { AppState } from '@state/app.reducer'
import { AuthState } from '@state/reducers/auth.reducer'

const authFeature = (state: AppState) => state.auth

export const authUser = createSelector(authFeature, (state: AuthState) => state.user)
export const authError = createSelector(authFeature, (state: AuthState) => state.error)
export const authLoading = createSelector(authFeature, (state: AuthState) => state.loading)
export const authToken = createSelector(authFeature, (state: AuthState) => state.access_token)
