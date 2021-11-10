import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as IncomeExpensesActions from 'src/app/state/actions/income-expenses.actions';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, OnDestroy {
  public contributions = 0;
  public monthlyPayments = 0;
  public certifications = 0;
  public expenses = 0;
  public incomes = 0;
  public total = 0;

  private incomeExpensesSubs!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(IncomeExpensesActions.loadCertifications());
    this.store.dispatch(IncomeExpensesActions.loadContribution());
    this.store.dispatch(IncomeExpensesActions.loadMonthlyPayments());
    this.store.dispatch(IncomeExpensesActions.loadExpenses());

    this.incomeExpensesSubs = this.store
      .select('incomeExpenses')
      .subscribe(
        ({
          contributions,
          monthlyPayments,
          certifications,
          expenses,
          incomes,
          total,
        }) => {
          this.contributions = contributions;
          this.monthlyPayments = monthlyPayments;
          this.certifications = certifications;
          this.expenses = expenses;
          this.incomes = incomes;
          this.total = total;
        }
      );
  }

  ngOnDestroy() {
    this.store.dispatch(IncomeExpensesActions.clean());
    this.incomeExpensesSubs?.unsubscribe();
  }
}
