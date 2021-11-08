import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Pipe({
  name: 'transactionsToTotal',
})
export class TransactionsToTotalPipe implements PipeTransform {
  transform(transactions: Transaction[]): number {
    return transactions
      .map((t) => t.amount)
      .reduce((counter, item) => counter + item, 0);
  }
}
