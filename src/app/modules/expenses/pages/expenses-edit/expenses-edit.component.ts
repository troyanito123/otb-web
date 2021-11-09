import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as ExpenseActions from 'src/app/state/actions/expense.action';

import { Expense } from 'src/app/models/expense.model';

@Component({
  selector: 'app-expenses-edit',
  templateUrl: './expenses-edit.component.html',
  styleUrls: ['./expenses-edit.component.scss'],
})
export class ExpensesEditComponent implements OnInit, OnDestroy {
  public expense!: Expense | null;
  private expenseSubs!: Subscription;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.store.dispatch(ExpenseActions.load({ id }));
    });

    this.subscribeStore();
  }

  ngOnDestroy(): void {
    this.store.dispatch(ExpenseActions.clean());
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
