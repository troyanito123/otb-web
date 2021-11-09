import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Expense } from 'src/app/models/expense.model';
import { AppState } from 'src/app/state/app.reducer';
import * as ExpensesActions from 'src/app/state/actions/expenses.action';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
})
export class ExpensesListComponent implements OnInit, OnDestroy {
  public expenses: Expense[] = [];
  private expensesSub!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeStore();

    this.store.dispatch(ExpensesActions.load());
  }

  ngOnDestroy(): void {
    this.store.dispatch(ExpensesActions.clean());
    this.unsubscribeStore();
  }

  private subscribeStore() {
    this.expensesSub = this.store
      .select('expenses')
      .subscribe(({ expenses }) => {
        this.expenses = expenses;
      });
  }

  private unsubscribeStore() {
    this.expensesSub?.unsubscribe();
  }
}
