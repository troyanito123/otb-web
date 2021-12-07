import { createAction, props } from '@ngrx/store';
import { Fine } from 'src/app/models/fine.model';

export const loadByUser = createAction(
  '[FINES] load fines by user',
  props<{ id: number }>()
);

export const loadByDate = createAction(
  '[FINES] load fines by date',
  props<{ initDate: string; endDate: string }>()
);

export const loadSuccess = createAction(
  '[FINES] load fines by user success',
  props<{ fines: Fine[] }>()
);

export const createMany = createAction(
  '[FINES] create many fines',
  props<{ userId: number; date: Date; meetingIds: string }>()
);

export const createManySuccess = createAction(
  '[FINES] create many fines success',
  props<{ fines: Fine[] }>()
);

export const clean = createAction('[FINES] clean fines state');

export const error = createAction(
  '[FINES] error on fines state',
  props<{ e: any }>()
);
