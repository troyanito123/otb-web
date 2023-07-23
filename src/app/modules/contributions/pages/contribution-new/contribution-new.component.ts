import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { ContributionActions } from '@state/actions/contribution.action'

@Component({
  selector: 'app-contribution-new',
  template: ` <app-contribution-form (onSubmit)="create($event)"></app-contribution-form> `,
})
export class ContributionNewComponent {
  #store = inject(Store)

  create(data: any) {
    this.#store.dispatch(
      ContributionActions.create({
        ...data,
        forwardSupplier: (id: number) => `private/contributions/${id}/detail`,
        messageSupplier: (text: string) => `Aporte \"${text}\" creado correctamente`,
      })
    )
  }
}
