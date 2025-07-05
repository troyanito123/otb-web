import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { MonthlyPaymentActions } from 'src/app/state/actions/monthly-payment.action'
import { MatDialog } from '@angular/material/dialog'
import { DeleteDialogComponent } from 'src/app/layouts/delete-dialog/delete-dialog.component'
import { monthlyPaymentFeature } from '@state/reducers/monthly-payment.reducer'

@Component({
    selector: 'app-monthly-payments-detail',
    templateUrl: './monthly-payments-detail.component.html',
    styleUrls: ['./monthly-payments-detail.component.scss'],
    standalone: false
})
export class MonthlyPaymentsDetailComponent {
  readonly monthlyPayment$ = this.store.select(monthlyPaymentFeature.selectMonthlyPayment)

  constructor(private store: Store, private matDialog: MatDialog) {}

  remove(id: number) {
    const dialog = this.matDialog.open(DeleteDialogComponent, {
      data: { name: 'mensualidad' },
    })

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          MonthlyPaymentActions.remove({
            id,
            forwardSupplier: () => '/private/monthly-payments',
            messageSupplier: () => `Se eliminó la mensualidad`,
          })
        )
      }
    })
  }
}
