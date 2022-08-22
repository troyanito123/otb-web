import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';

import { Expense } from 'src/app/models/expense.model';

@Component({
  selector: 'app-expenses-edit',
  templateUrl: './expenses-edit.component.html',
  styleUrls: ['./expenses-edit.component.scss'],
})
export class ExpensesEditComponent implements OnInit, OnDestroy {
  public expense!: Expense | null;
  private expenseSubs!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeStore();
  }

  ngOnDestroy(): void {
    this.unsubscribeStore();
  }

  private subscribeStore() {
    this.expenseSubs = this.store.select('expense').subscribe(({ expense }) => {
      this.expense = expense;
    });
  }

  private unsubscribeStore() {
    this.expenseSubs?.unsubscribe();
  }
}
