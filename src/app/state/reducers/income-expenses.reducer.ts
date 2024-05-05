import { createFeature, createReducer, createSelector, on } from '@ngrx/store'

import { IncomeExpensesActions } from '../actions/income-expenses.actions'

export interface IncomeExpensesState {
  contributions: number
  extraContributions: number
  monthlyPayments: number
  certifications: number
  fines: number
  expenses: number
  incomes: number
  incomesFromPeople: number
  total: number
  loading: boolean
  error: any
}

export const initialIncomeExpensesState: IncomeExpensesState = {
  contributions: 0,
  extraContributions: 0,
  monthlyPayments: 0,
  certifications: 0,
  fines: 0,
  expenses: 0,
  incomes: 0,
  incomesFromPeople: 0,
  total: 0,
  loading: false,
  error: null,
}

const incomeExpensesReducer = createReducer(
  initialIncomeExpensesState,

  on(IncomeExpensesActions.error, (state, { e }) => ({
    ...state,
    error: e.error,
  })),
  on(IncomeExpensesActions.loadIncomesExpenses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IncomeExpensesActions.loadIncomesExpensesSuccess, (state, data) => ({
    ...state,
    loading: false,
    contributions: data.contributions,
    extraContributions: data.extraContributions,
    monthlyPayments: data.monthlyPayments,
    certifications: data.certifications,
    fines: data.fines,
    expenses: data.expenses,
    incomesFromPeople: data.incomesFromPeople,
    incomes:
      data.contributions +
      data.extraContributions +
      data.monthlyPayments +
      data.certifications +
      data.fines +
      data.incomesFromPeople,
    total:
      data.contributions +
      data.extraContributions +
      data.monthlyPayments +
      data.certifications +
      data.fines +
      data.incomesFromPeople -
      data.expenses,
  })),

  on(IncomeExpensesActions.clean, (state) => ({
    contributions: 0,
    extraContributions: 0,
    monthlyPayments: 0,
    certifications: 0,
    fines: 0,
    expenses: 0,
    incomes: 0,
    incomesFromPeople: 0,
    total: 0,
    loading: false,
    error: null,
  }))
)

export const incomeExpensesFeature = createFeature({
  name: 'incomeExpenses',
  reducer: incomeExpensesReducer,
  extraSelectors: ({
    selectContributions,
    selectExtraContributions,
    selectMonthlyPayments,
    selectCertifications,
    selectFines,
    selectIncomesFromPeople,
  }) => ({
    incomesList: createSelector(
      selectContributions,
      selectExtraContributions,
      selectMonthlyPayments,
      selectCertifications,
      selectFines,
      selectIncomesFromPeople,
      (
        selectContributions,
        selectExtraContributions,
        selectMonthlyPayments,
        selectCertifications,
        selectFines,
        selectIncomesFromPeople
      ) => [
        {
          name: 'Mensualidades',
          value: selectMonthlyPayments,
        },
        {
          name: 'Aportes',
          value: selectContributions,
        },
        {
          name: 'Certificaciones',
          value: selectCertifications,
        },
        {
          name: 'Multas',
          value: selectFines,
        },
        {
          name: 'Ingresos Extras',
          value: selectIncomesFromPeople,
        },
        {
          name: 'Contribuciones extras',
          value: selectExtraContributions,
        },
      ]
    ),
  }),
})
