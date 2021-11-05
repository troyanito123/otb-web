import { createAction, props } from '@ngrx/store';
import { Transaction } from 'src/app/models/transaction.model';

export const addTransaction = createAction(
  '[TRANSACTIONS] add transaction ',
  props<{ transactions: Transaction[] }>()
);

export const cleanTransactions = createAction(
  '[TRANSACTIONS] remove all trasactions'
);
