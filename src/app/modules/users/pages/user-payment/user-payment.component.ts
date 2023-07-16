import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { MonthlyPaymentActions } from 'src/app/state/actions/monthly-payments.action'
import { MonthlyPaymentMadeActions } from 'src/app/state/actions/monthly-payments-made.action'
import { PrePaymentActions } from 'src/app/state/actions/pre-payment.action'
import * as TransactionsActions from 'src/app/state/actions/transactions.action'
import { AppState } from 'src/app/state/app.reducer'
import { MonthlyPaymentMade } from 'src/app/models/monthly-payment-made'
import { PrePayment } from 'src/app/models/pre-payment'
import { Transaction } from 'src/app/models/transaction.model'
import { ActivatedRoute, Router } from '@angular/router'
import { userFeature } from '@state/reducers/user.reducer'
import { monthlyPaymentsFeature } from '@state/reducers/monthly-payments.reducer'
import { monthlyPaymentsMadeFeature } from '@state/reducers/monthly-payments-made.reducer'
import { MatSelectChange } from '@angular/material/select'

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.scss'],
})
export class UserPaymentComponent implements OnInit, OnDestroy {
  yearInput = new FormControl(new Date().getFullYear().toString(), Validators.required)
  years = ['2021', '2022', '2023']

  displayedColumns: string[] = ['year', 'month', 'amountForPay', 'amountPay', 'option']

  protected user$ = this.store.select(userFeature.selectUser)
  protected mp$ = this.store.select(monthlyPaymentsFeature.selectMonthlyPayments)
  protected mpm$ = this.store.select(monthlyPaymentsMadeFeature.selectMonthlyPaymentsMade)

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadPayments(this.yearInput.value!)
  }

  ngOnDestroy(): void {
    this.store.dispatch(MonthlyPaymentActions.clean())
    this.store.dispatch(MonthlyPaymentMadeActions.clean())
  }

  yearInputChange(data: MatSelectChange) {
    this.loadPayments(data.value)
  }

  addToPrePaid(prePayment: PrePayment) {
    this.store.dispatch(PrePaymentActions.addPayment({ prePayment }))
  }

  public reprint(data: MonthlyPaymentMade[]) {
    this.store.dispatch(
      TransactionsActions.addTransaction({
        transactions: this.generateTransactions(data),
      })
    )
    this.router.navigate(['../', 'receipt-view'], { relativeTo: this.route })
  }

  private generateTransactions(data: MonthlyPaymentMade[]) {
    return data.map((p) => {
      const { monthlyPayment, amount, date } = p
      const { month, year } = monthlyPayment
      const description = `PAGO MENSUALIDAD DE: ${month} - ${year}`
      return new Transaction(description, amount, date)
    })
  }

  private loadPayments(year: string) {
    this.store.dispatch(MonthlyPaymentActions.loadPayments({ year }))
    this.store.dispatch(MonthlyPaymentMadeActions.loadPaymentsMade({ year }))
  }
}
