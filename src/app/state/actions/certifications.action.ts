import { createAction, props } from '@ngrx/store';
import { Certification } from 'src/app/models/certification.model';

export const load = createAction('[CERTIFICATIONS] load certifications');

export const loadSuccess = createAction(
  '[CERTIFICATIONS] load certifications success',
  props<{ certifications: Certification[] }>()
);

export const error = createAction(
  '[CERTIFICATIONS] catch error',
  props<{ e: any }>()
);

export const clean = createAction(
  '[CERTIFICATIONS] clean certifications state'
);
