import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { ExtraContActions } from 'src/app/state/actions/extra-contribution.action'
import { extraContributionFeature } from '@state/reducers/extra-contribution.reducer'

@Component({
  selector: 'app-extra-contributions-list',
  templateUrl: './extra-contributions-list.component.html',
  styleUrls: ['./extra-contributions-list.component.scss'],
})
export class ExtraContributionsListComponent {
  readonly extraContributions$ = this.store.select(
    extraContributionFeature.selectExtraContributions
  )

  constructor(private store: Store) {
    this.store.dispatch(ExtraContActions.loadAll())
  }
}
