import { createAction, props } from '@ngrx/store'
import { PreContribution } from 'src/app/models/pre-contributions'

const addContributionPaid = createAction(
  '[CONTRIBUTION_PAID] add pre-contribution paid',
  props<{ preContribution: PreContribution }>()
)

const substractContributionPaid = createAction(
  '[CONTRIBUTION_PAID] substract pre-contribution paid',
  props<{ preContribution: PreContribution }>()
)

const clean = createAction('[CONTRIBUTION_PAID] clean pre-contributions paid')

export const PreContributionsActions = {
  addContributionPaid,
  substractContributionPaid,
  clean,
}
