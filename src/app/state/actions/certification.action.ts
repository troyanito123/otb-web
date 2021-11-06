import { createAction, props } from '@ngrx/store';
import {
  Certification,
  CertificationType,
} from 'src/app/models/certification.model';

export const create = createAction(
  '[CERTIFICATION] create one',
  props<{
    description: string;
    amount: number;
    ctype: CertificationType;
    date: Date;
    userId: number;
  }>()
);

export const createSuccess = createAction(
  '[CERTIFICATION] create success',
  props<{ certification: Certification }>()
);

export const error = createAction(
  '[CERTIFICATION] catch error',
  props<{ e: any }>()
);

export const clean = createAction('[CERTIFICATION] clean');
