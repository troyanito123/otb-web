import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from '@state/app.reducer'
import { IncomesActions } from '@state/actions/incomes.action'
import { incomesFeature } from '@state/reducers/incomes.reducer'

@Component({
  selector: 'app-income-edit',
  template: `
    <ng-container *ngIf="income$ | async as income">
      <app-income-form [income]="income" (onSubmit)="onSubmit($event)"></app-income-form>
    </ng-container>
  `,
  styles: [],
})
export class IncomeEditComponent {
  #store = inject(Store<AppState>)
  readonly income$ = this.#store.select(incomesFeature.selectIncome)

  public onSubmit(data: any) {
    this.#store.dispatch(
      IncomesActions.update({
        ...data,
        forwardSupplier: (id: number) => `private/incomes/${id}/detail`,
      })
    )
  }
}
