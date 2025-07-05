import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { ContributionActions } from '@state/actions/contribution.action'
import { contributionFeature } from '@state/reducers/contribution.reducer'

@Component({
    selector: 'app-contribution-edit',
    template: `
    <app-contribution-form
      [contribution]="contribution$ | async"
      (onSubmit)="update($event)"
    ></app-contribution-form>
  `,
    standalone: false
})
export class ContributionEditComponent {
  #store = inject(Store)
  readonly contribution$ = this.#store.select(contributionFeature.selectContribution)

  update(data: any) {
    this.#store.dispatch(
      ContributionActions.update({
        ...data,
        forwardSupplier: (id: number) => `private/contributions/${id}/detail`,
        messageSupplier: (text: string) => `Aporte \"${text}\" actualizado correctamente`,
      })
    )
  }
}
