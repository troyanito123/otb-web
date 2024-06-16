import { createAction, props } from '@ngrx/store';
import { Meeting } from 'src/app/models/meeting.model';

const load = createAction('[MEETINGS] load meetings');
const clean = createAction('[MEETINGS] clean meetings');

const loadSuccess = createAction(
  '[MEETINGS] load success meetings',
  props<{ meetings: Meeting[] }>()
);

const error = createAction(
  '[MEETINGS] erro on load meetings',
  props<{ e: any }>()
);

export const MeetingsActions = {
  load, clean, loadSuccess, error
}
