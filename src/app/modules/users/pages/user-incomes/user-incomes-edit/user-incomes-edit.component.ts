import { Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { IncomesActions } from '@state/actions/incomes.action'
import { incomesFeature } from '@state/reducers/incomes.reducer'

@Component({
    selector: 'app-user-incomes-edit',
    template: `
    <app-user-incomes-form
      [income]="income$ | async"
      (onSubmit)="update($event)"
    ></app-user-incomes-form>
  `,
    standalone: false
})
export class UserIncomesEditComponent implements OnInit {
  #store = inject(Store)
  #activatedRoute = inject(ActivatedRoute)

  readonly income$ = this.#store.select(incomesFeature.selectIncome)

  ngOnInit(): void {
    this.#activatedRoute.params.subscribe(({ id }) =>
      this.#store.dispatch(IncomesActions.load({ id: Number(id) }))
    )
  }

  public update(data: any) {
    console.log(data)
    this.#store.dispatch(
      IncomesActions.update({
        ...data,
        forwardSupplier: (id: number) => `private/users/${id}/incomes/list`,
        messageSupplier: (text: string) => `Ingreso ${text} actualizado correctamente`,
      })
    )
  }
}
