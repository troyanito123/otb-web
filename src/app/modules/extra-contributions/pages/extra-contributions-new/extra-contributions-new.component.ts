import { Component, OnInit, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { ExtraContActions } from 'src/app/state/actions/extra-contribution.action'
import { ExtraContributionData } from '@models/extra-contribution.interface'

@Component({
    selector: 'app-extra-contributions-new',
    template: `
    <app-extra-contribution-form (clickSave)="save($event)"></app-extra-contribution-form>
  `,
    standalone: false
})
export class ExtraContributionsNewComponent {
  #store = inject(Store)

  public save(data: ExtraContributionData) {
    this.#store.dispatch(
      ExtraContActions.create({
        data,
        forwardSupplier: (id: number) => `/private/extra-contributions/${id}`,
      })
    )
  }
}
