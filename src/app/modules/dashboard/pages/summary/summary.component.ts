import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { incomeExpensesFeature } from '@state/reducers/income-expenses.reducer'
import { IncomeExpensesActions } from 'src/app/state/actions/income-expenses.actions'

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit, OnDestroy {
  #store = inject(Store)
  readonly total$ = this.#store.select(incomeExpensesFeature.selectTotal)
  readonly expenses$ = this.#store.select(incomeExpensesFeature.selectExpenses)
  readonly incomesChart$ = this.#store.select(incomeExpensesFeature.incomesList)

  ngOnInit(): void {
    this.#store.dispatch(IncomeExpensesActions.loadIncomesExpenses())
  }

  ngOnDestroy() {
    this.#store.dispatch(IncomeExpensesActions.clean())
  }
}
