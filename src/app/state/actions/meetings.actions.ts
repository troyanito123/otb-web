import { createAction, props } from '@ngrx/store';
import { Meeting } from 'src/app/models/meeting.model';

export const load = createAction('[MEETINGS] load meetings');
export const clean = createAction('[MEETINGS] clean meetings');

export const loadSucces = createAction(
  '[MEETINGS] load success meetings',
  props<{ meetings: Meeting[] }>()
);

export const error = createAction(
  '[MEETINGS] erro on load meetings',
  props<{ e: any }>()
);
