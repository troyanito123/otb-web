import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { Expense } from 'src/app/models/expense.model';
import { ExpenseService } from 'src/app/services/expense.service';

export class ExpensesDataSource implements DataSource<Expense> {
  private expensesSubject = new BehaviorSubject<Expense[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  private sizeSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public size$ = this.sizeSubject.asObservable();

  constructor(private expenseService: ExpenseService) {}

  loadExpenses(keyword: string, sort: string, page: number, take: number) {
    this.loadingSubject.next(true);
    this.expenseService
      .getAll(keyword, sort, page, take)
      .pipe(
        catchError(() => of({ count: 0, expenses: [] })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(({ count, expenses }) => {
        this.sizeSubject.next(count);
        this.expensesSubject.next(expenses);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Expense[]> {
    console.log('Connecting data source');
    return this.expensesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.expensesSubject.complete();
    this.loadingSubject.complete();
    this.sizeSubject.complete();
  }
}
