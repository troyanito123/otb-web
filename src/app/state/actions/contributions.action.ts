import { createAction, props } from '@ngrx/store'
import { Contribution } from 'src/app/models/contribution.model'

const loadContributions = createAction('[CONTRIBUTIONS] load contributions')

const loadContributionsSuccess = createAction(
  '[CONTRIBUTIONS] load contributions success',
  props<{ contributions: Contribution[] }>()
)

const loadContributionsError = createAction(
  '[CONTRIBUTIONS] load contributions error',
  props<{ e: any }>()
)

const cleanContributions = createAction('[CONTRIBUTIONS] clean contributions')

export const ContributionsActions = {
  loadContributions,
  loadContributionsSuccess,
  loadContributionsError,
  cleanContributions,
}
