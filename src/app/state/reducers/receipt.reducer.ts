import { createFeature, createReducer, on } from '@ngrx/store'
import { Transaction } from 'src/app/models/transaction.model'
import * as TransactionsActions from '../actions/transactions.action'

export interface TransactionsState {
  transactions: Transaction[]
}

export const initialTransactionsState: TransactionsState = {
  transactions: [],
}

const transactionsReducer = createReducer(
  initialTransactionsState,

  on(TransactionsActions.addTransaction, (state, { transactions }) => ({
    transactions: state.transactions.concat(transactions),
  })),

  on(TransactionsActions.cleanTransactions, () => ({
    transactions: [],
  }))
)

export const transactionsFeature = createFeature({
  name: 'transactions',
  reducer: transactionsReducer,
})
