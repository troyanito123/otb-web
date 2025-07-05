import { Component, OnDestroy, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { ExtraContActions } from 'src/app/state/actions/extra-contribution.action'
import { authFeature } from '@state/reducers/auth.reducer'

@Component({
    selector: 'app-extra-contributions',
    templateUrl: './extra-contributions.component.html',
    styleUrls: ['./extra-contributions.component.scss'],
    standalone: false
})
export class ExtraContributionsComponent implements OnDestroy {
  #store = inject(Store)
  readonly auth$ = this.#store.select(authFeature.selectUser)

  ngOnDestroy(): void {
    this.#store.dispatch(ExtraContActions.clean())
  }
}
