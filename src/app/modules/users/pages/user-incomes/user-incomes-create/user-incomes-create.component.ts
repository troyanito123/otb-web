import { Component, OnDestroy, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { IncomesActions } from '@state/actions/incomes.action'

@Component({
  selector: 'app-user-incomes-create',
  template: ` <app-user-incomes-form (onSubmit)="create($event)"></app-user-incomes-form> `,
})
export class UserIncomesCreateComponent implements OnDestroy {
  #store = inject(Store)

  ngOnDestroy(): void {
    this.#store.dispatch(IncomesActions.clean())
  }

  public create(data: any) {
    this.#store.dispatch(
      IncomesActions.create({
        ...data,
        forwardSupplier: (id: number) => `private/users/${id}/incomes`,
        messageSupplier: (text: string) => `Ingreso ${text} creado correctamente`,
      })
    )
  }
}
