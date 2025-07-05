import { Component, inject } from '@angular/core'
import { ExtraContributionData } from '@models/extra-contribution.interface'
import { Store } from '@ngrx/store'
import { extraContributionFeature } from '@state/reducers/extra-contribution.reducer'
import { ExtraContActions } from 'src/app/state/actions/extra-contribution.action'

@Component({
    selector: 'app-extra-contributions-edit',
    template: `
    @if (extraContribution$ | async; as extraContribution) {
      <app-extra-contribution-form
        [extraContribution]="extraContribution"
        (clickSave)="update($event, extraContribution.id)"
      ></app-extra-contribution-form>
    }
    `,
    styles: [],
    standalone: false
})
export class ExtraContributionsEditComponent {
  #store = inject(Store)
  readonly extraContribution$ = this.#store.select(extraContributionFeature.selectExtraContribution)

  public update(data: ExtraContributionData, id: number) {
    this.#store.dispatch(
      ExtraContActions.update({
        id,
        data,
        forwardSupplier: (id: number) => `private/extra-contributions/${id}`,
      })
    )
  }
}
