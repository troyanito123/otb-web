import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ExpenseActions from '@state/actions/expense.action';
import { AppState } from '@state/app.reducer';

@Component({
  selector: 'app-expenses-view',
  templateUrl: './expenses-view.component.html',
  styleUrls: ['./expenses-view.component.scss'],
})
export class ExpensesViewComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.store.dispatch(ExpenseActions.load({ id }));
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ExpenseActions.clean());
  }
}
