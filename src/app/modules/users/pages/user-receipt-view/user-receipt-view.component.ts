import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import { User } from 'src/app/models/user.model'
import { Transaction } from 'src/app/models/transaction.model'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.reducer'
import * as TransactionsActions from 'src/app/state/actions/transactions.action'
import { userFeature } from '@state/reducers/user.reducer'
import { authFeature } from '@state/reducers/auth.reducer'
import { transactionsFeature } from '@state/reducers/receipt.reducer'
@Component({
  selector: 'app-user-receipt-view',
  templateUrl: './user-receipt-view.component.html',
  styleUrls: ['./user-receipt-view.component.scss'],
})
export class UserReceiptViewComponent {
  protected auth$ = this.store.select(authFeature.selectUser)
  protected user$ = this.store.select(userFeature.selectUser)
  protected transactions$ = this.store.select(transactionsFeature.selectTransactions)

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  qrValue(transactions: Transaction[], user: User, authName: string) {
    return JSON.stringify({
      amount: transactions.reduce((acum, curr) => acum + curr.amount, 0),
      from_user: {
        name: user?.name,
        block_number: user?.block_number,
        address_number: user?.address_number,
      },
      to_user: authName,
      date: transactions[0] ? transactions[0].date : new Date().toISOString(),
    })
  }

  public print(userName: string) {
    const element = document.getElementById('receipt')
    html2canvas(element!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const doc = new jsPDF()
      doc.addImage(imgData, 'letter', 5, 15, 200, 120)
      doc.addImage(imgData, 'letter', 5, 160, 200, 120)
      doc.save(`${userName}.pdf`)
      this.store.dispatch(TransactionsActions.cleanTransactions())
      this.router.navigate(['../', 'detail'], { relativeTo: this.route })
    })
  }
}
