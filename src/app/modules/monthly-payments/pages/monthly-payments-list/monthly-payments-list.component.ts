import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.reducer'
import { MonthlyPaymentActions } from 'src/app/state/actions/monthly-payments.action'
import { FormControl, Validators } from '@angular/forms'
import { MatSelectChange } from '@angular/material/select'
import { monthlyPaymentsFeature } from '@state/reducers/monthly-payments.reducer'

@Component({
  selector: 'app-monthly-payments-list',
  templateUrl: './monthly-payments-list.component.html',
  styleUrls: ['./monthly-payments-list.component.scss'],
})
export class MonthlyPaymentsListComponent implements OnInit, OnDestroy {
  protected monthlyPayments$ = this.store.select(monthlyPaymentsFeature.selectMonthlyPayments)

  protected years = ['2021', '2022', '2023']

  protected inputYear = new FormControl('2021', [Validators.required])

  protected displayedColumns = ['year', 'month', 'amount']

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(MonthlyPaymentActions.loadPayments({ year: this.inputYear.value! }))
  }

  ngOnDestroy(): void {
    this.store.dispatch(MonthlyPaymentActions.clean())
  }

  yearInputChange(data: MatSelectChange) {
    this.store.dispatch(MonthlyPaymentActions.loadPayments({ year: String(data) }))
  }
}
