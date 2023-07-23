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
  public extraContributions = 0;
  public monthlyPayments = 0;
  public certifications = 0;
  public fines = 0;
  public expenses = 0;
  public incomes = 0;
  public incomesFromPeople = 0;
  public total = 0;

  private incomeExpensesSubs!: Subscription;

  view: [number, number] = [650, 250];

  public incomesChart: any[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store.dispatch(IncomeExpensesActions.loadCertifications());
    // this.store.dispatch(IncomeExpensesActions.loadContribution());
    // this.store.dispatch(IncomeExpensesActions.loadMonthlyPayments());
    // this.store.dispatch(IncomeExpensesActions.loadExpenses());
    // this.store.dispatch(IncomeExpensesActions.loadFines());
    // this.store.dispatch(IncomeExpensesActions.loadExtraContribution());
    // this.store.dispatch(IncomeExpensesActions.loadIncome());

    this.incomeExpensesSubs = this.store
      .select('incomeExpenses')
      .subscribe(
        ({
          contributions,
          extraContributions,
          monthlyPayments,
          certifications,
          fines,
          expenses,
          incomes,
          incomesFromPeople,
          total,
        }) => {
          this.contributions = contributions;
          this.extraContributions = extraContributions;
          this.monthlyPayments = monthlyPayments;
          this.certifications = certifications;
          this.fines = fines;
          this.expenses = expenses;
          this.incomes = incomes;
          this.incomesFromPeople = incomesFromPeople;
          this.total = total;
          this.incomesChart = [
            {
              name: 'Mensualidades',
              value: monthlyPayments,
            },
            {
              name: 'Aportes',
              value: contributions,
            },
            {
              name: 'Certificados',
              value: certifications,
            },
            {
              name: 'Multas',
              value: fines,
            },
            {
              name: 'Ingresos Extras',
              value: incomesFromPeople,
            },
            {
              name: 'Contribuciones extras',
              value: extraContributions,
            },
          ];
        }
      );
  }

  ngOnDestroy() {
    // this.store.dispatch(IncomeExpensesActions.clean());
    this.incomeExpensesSubs?.unsubscribe();
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
