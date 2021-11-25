import { createReducer, on } from '@ngrx/store';
import { PreFinesPaid } from 'src/app/models/pre-fines-paid.model';
import * as PreFinesActions from '../actions/pre-fine.action';

export interface PreFinesState {
  preFines: PreFinesPaid[];
  total: number;
}

export const initialPreFinesState: PreFinesState = {
  preFines: [],
  total: 0,
};

const _preFinesReducer = createReducer(
  initialPreFinesState,

  on(PreFinesActions.addFinePaid, (state, { preFine }) => ({
    preFines: state.preFines.find((p) => p.meetingId === preFine.meetingId)
      ? [...state.preFines]
      : [...state.preFines, preFine],
    total: state.preFines.find((p) => p.meetingId === preFine.meetingId)
      ? state.total
      : state.total + preFine.fine,
  })),

  on(PreFinesActions.substractFinePaid, (state, { preFine }) => ({
    preFines: state.preFines.filter((p) => p.meetingId !== preFine.meetingId),
    total: state.total - preFine.fine,
  })),

  on(PreFinesActions.clean, () => ({
    preFines: [],
    total: 0,
  }))
);

export function preFinesReducer(state: any, action: any) {
  return _preFinesReducer(state, action);
}
