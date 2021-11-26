import { createAction, props } from '@ngrx/store';
import {
  Certification,
  CertificationType,
} from 'src/app/models/certification.model';

export const load = createAction(
  '[CERTIFICATION] load certification',
  props<{ id: number }>()
);

export const loadSuccess = createAction(
  '[CERTIFICATION] load certification success',
  props<{ certification: Certification }>()
);

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

export const update = createAction(
  '[CERTIFICATION] update certification one',
  props<{
    id: number;
    description: string;
    amount: number;
    ctype: CertificationType;
    date: Date;
  }>()
);

export const updateSuccess = createAction(
  '[CERTIFICATION] update certification success',
  props<{ certification: Certification }>()
);

export const remove = createAction(
  '[CERTIFICATION] remove certification one',
  props<{ id: number }>()
);

export const removeSuccess = createAction(
  '[CERTIFICATION] remove certification success',
  props<{ certification: Certification }>()
);

export const error = createAction(
  '[CERTIFICATION] catch error',
  props<{ e: any }>()
);

export const clean = createAction('[CERTIFICATION] clean');

export const softClean = createAction(
  '[CERTIFICATION] clean updated created saved'
);
