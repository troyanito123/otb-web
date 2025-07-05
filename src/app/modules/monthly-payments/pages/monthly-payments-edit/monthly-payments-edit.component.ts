import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { MonthlyPaymentActions } from '@state/actions/monthly-payment.action'
import { monthlyPaymentFeature } from '@state/reducers/monthly-payment.reducer'

@Component({
    selector: 'app-monthly-payments-edit',
    template: `
    @if (monthlyPayment$ | async; as monthlyPayment) {
      <h2>Modifica la mensualidad</h2>
      <app-monthly-payments-form
        [monthlyPayment]="monthlyPayment"
        (clickSave)="update($event, monthlyPayment.id)"
      ></app-monthly-payments-form>
    }
    `,
    standalone: false
})
export class MonthlyPaymentsEditComponent {
  #store = inject(Store)
  readonly monthlyPayment$ = this.#store.select(monthlyPaymentFeature.selectMonthlyPayment)

  public update(data: any, id: number) {
    this.#store.dispatch(
      MonthlyPaymentActions.update({
        ...data,
        id,
        forwardSupplier: (id) => `/private/monthly-payments/${id}`,
      })
    )
  }
}
