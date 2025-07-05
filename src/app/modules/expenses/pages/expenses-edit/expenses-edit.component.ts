import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { ExpenseActions } from '@state/actions/expense.action'
import { authFeature } from '@state/reducers/auth.reducer'
import { expenseFeature } from '@state/reducers/expense.reducer'

@Component({
    selector: 'app-expenses-edit',
    template: `
    @if (expense$ | async; as expense) {
      <h2>Editar un gasto</h2>
      @if (auth$ | async; as auth) {
        <app-expenses-form
          [expense]="expense"
          [auth]="auth"
          (clickSave)="update($event, expense.id)"
        ></app-expenses-form>
      }
    }
    `,
    standalone: false
})
export class ExpensesEditComponent {
  #store = inject(Store)
  readonly auth$ = this.#store.select(authFeature.selectUser)
  readonly expense$ = this.#store.select(expenseFeature.selectExpense)

  public update(data: any, expenseId: number) {
    this.#store.dispatch(
      ExpenseActions.update({
        ...data,
        id: expenseId,
        forwardSupplier: (id) => `/private/expenses/${id}`,
        messageSupplier: (expense) => `Se modificó el gasto: ${expense.description}`,
      })
    )
  }
}
