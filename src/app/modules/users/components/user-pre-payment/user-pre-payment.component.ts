import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from '@state/app.reducer'
import { MonthlyPaymentsMadeActions } from '@state/actions/monthly-payments-made.action'
import { PrePaymentActions } from '@state/actions/pre-payment.action'
import { PrePayment } from 'src/app/models/pre-payment'
import { Transaction } from 'src/app/models/transaction.model'
import { FormControl, Validators } from '@angular/forms'
import { prePaymentFeature } from '@state/reducers/pre-payment.reducer'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MonthlyPaymentMade } from '@models/monthly-payment-made'

@Component({
    selector: 'app-user-pre-payment',
    templateUrl: './user-pre-payment.component.html',
    styleUrls: ['./user-pre-payment.component.scss'],
    standalone: false
})
export class UserPrePaymentComponent {
  protected displayedColumns: string[] = ['year', 'month', 'amountForPay', 'option']

  protected inputDate = new FormControl(new Date().toISOString(), [Validators.required])

  protected prePayments$ = this.store.select(prePaymentFeature.selectPrePayments)
  protected prePaymentsTotal$ = this.store.select(prePaymentFeature.selectPrePaymentTotal)

  constructor(private store: Store<AppState>, private matSnackBar: MatSnackBar) {}

  substractToPrePaid(id: number) {
    this.store.dispatch(PrePaymentActions.subtractPayment({ id }))
  }

  confirmPaid(prePayments: PrePayment[]) {
    if (!prePayments.length) {
      this.matSnackBar.open('Agregue un pago primero', 'OK')
      return
    }
    const monthsId = JSON.stringify(prePayments.map((p) => p.id))

    this.store.dispatch(
      MonthlyPaymentsMadeActions.createManyPaymentsMade({
        monthsId,
        date: new Date(this.inputDate.value!),
        generateTransactionsCallbak: this.generateTransactions,
        forwardSupplier: (id: number) => `/private/users/${id}/receipt-view`,
      })
    )
  }

  generateTransactions = (prePayments: MonthlyPaymentMade[]): Transaction[] => {
    const info = prePayments.reduce(
      (acum: { sum: number; desc: string[] }, curr) => {
        return {
          desc: [...acum.desc, `${curr.monthlyPayment.month}/${curr.monthlyPayment.year}`],
          sum: acum.sum + curr.amount,
        }
      },
      { sum: 0, desc: [] }
    )

    return [
      new Transaction(
        `Mensualidades de: ${info.desc.join(' - ')}`,
        info.sum,
        new Date(this.inputDate.value!)
      ),
    ]
  }
}
