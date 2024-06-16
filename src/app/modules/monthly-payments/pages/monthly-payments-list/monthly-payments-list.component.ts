import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.reducer'
import { MonthlyPaymentsActions } from 'src/app/state/actions/monthly-payments.action'
import { FormControl, Validators } from '@angular/forms'
import { MatSelectChange } from '@angular/material/select'
import { monthlyPaymentsFeature } from '@state/reducers/monthly-payments.reducer'

@Component({
  selector: 'app-monthly-payments-list',
  templateUrl: './monthly-payments-list.component.html',
  styleUrls: ['./monthly-payments-list.component.scss'],
})
export class MonthlyPaymentsListComponent implements OnInit, OnDestroy {
  readonly monthlyPayments$ = this.store.select(monthlyPaymentsFeature.selectMonthlyPayments)

  readonly years = ['2021', '2022', '2023', '2024']

  readonly inputYear = new FormControl('2021', [Validators.required])

  readonly displayedColumns = ['year', 'month', 'amount']

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(MonthlyPaymentsActions.loadPayments({ year: this.inputYear.value! }))
  }

  ngOnDestroy(): void {
    this.store.dispatch(MonthlyPaymentsActions.clean())
  }

  yearInputChange(data: MatSelectChange) {
    this.store.dispatch(MonthlyPaymentsActions.loadPayments({ year: String(data) }))
  }
}
