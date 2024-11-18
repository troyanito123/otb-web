import { createFeature, createReducer, on } from '@ngrx/store'
import { Fine } from 'src/app/models/fine.model'
import { FinesActions } from '../actions/fines.actions'
import { PreFinesPaid } from '@models/pre-fines-paid.model'

export interface FinesState {
  fines: Fine[]
  total: number
  allUserPreFines: PreFinesPaid[]
  loading: boolean
  error: any
}

export const initialFinesState: FinesState = {
  fines: [],
  total: 0,
  allUserPreFines: [],
  loading: false,
  error: null,
}

const finesReducer = createReducer(
  initialFinesState,

  on(FinesActions.loadAllFinesByUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(FinesActions.loadAllFinesByUserSuccess, (state, { allUserPreFines }) => ({
    ...state,
    loading: false,
    total: allUserPreFines
      .filter((d) => d.attendence === 'NO')
      .map((d) => d.fine - d.finePaid)
      .reduce((a, c) => a + c, 0),
    allUserPreFines,
  })),

  on(FinesActions.loadByDate, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(FinesActions.loadSuccess, (state, { fines }) => ({
    ...state,
    fines,
    loading: false,
  })),

  on(FinesActions.createMany, (state) => ({
    ...state,
    loading: true,
  })),

  on(FinesActions.createManySuccess, (state) => ({
    ...state,
    loading: false,
  })),

  on(FinesActions.error, (state, { e }) => ({
    ...state,
    loading: false,
    error: e.error,
  })),

  on(FinesActions.clean, () => ({
    fines: [],
    total: 0,
    allUserPreFines: [],
    loading: false,
    error: null,
  }))
)

export const finesFeature = createFeature({ name: 'fines', reducer: finesReducer })
