import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { MonthlyPaymentActions } from '@state/actions/monthly-payment.action'

@Component({
    selector: 'app-monthly-payments-new',
    template: `
    <h2>Crea una nueva mensualidad</h2>
    <app-monthly-payments-form (clickSave)="create($event)"></app-monthly-payments-form>
  `,
    standalone: false
})
export class MonthlyPaymentsNewComponent {
  #store = inject(Store)

  public create(data: any) {
    this.#store.dispatch(
      MonthlyPaymentActions.create({
        ...data,
        forwardSupplier: (id) => `/private/monthly-payments/${id}`,
      })
    )
  }
}
