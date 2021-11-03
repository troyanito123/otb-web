import { createAction, props } from '@ngrx/store';
import { PreContribution } from 'src/app/models/pre-contributions';

export const setPreContribution = createAction(
  '[PAYMENT] set contribution',
  props<{ preContribution: PreContribution }>()
);

export const unsetContribution = createAction('[PAYMENT] unset contribution');
