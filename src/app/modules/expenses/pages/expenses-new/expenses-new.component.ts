import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { ExpenseActions } from '@state/actions/expense.action'
import { authFeature } from '@state/reducers/auth.reducer'

@Component({
    selector: 'app-expenses-new',
    template: `
    <h2>Registrar un gasto</h2>
    <ng-container *ngIf="auth$ | async as auth">
      <app-expenses-form (clickSave)="create($event)" [auth]="auth"></app-expenses-form>
    </ng-container>
  `,
    standalone: false
})
export class ExpensesNewComponent {
  #store = inject(Store)
  readonly auth$ = this.#store.select(authFeature.selectUser)
  public create(data: any) {
    this.#store.dispatch(
      ExpenseActions.create({ ...data, forwardSupplier: (id) => `/private/expenses/${id}/detail` })
    )
  }
}
