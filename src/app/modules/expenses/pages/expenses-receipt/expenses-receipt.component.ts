import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.reducer';
import * as ExpenseActions from '@state/actions/expense.action';
import { Expense } from '@models/expense.model';

@Component({
  selector: 'app-expenses-receipt',
  templateUrl: './expenses-receipt.component.html',
  styleUrls: ['./expenses-receipt.component.scss'],
})
export class ExpensesReceiptComponent implements OnInit {
  public expense!: Expense | null;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('expense').subscribe(({ expense }) => {
      this.expense = expense;
    });
  }
}
