import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { contributionsFeature } from '@state/reducers/contributions.reducer'
import { ContributionsActions } from 'src/app/state/actions/contributions.action'

@Component({
    selector: 'app-contribution-list',
    templateUrl: './contribution-list.component.html',
    styleUrls: ['./contribution-list.component.scss'],
    standalone: false
})
export class ContributionListComponent implements OnInit, OnDestroy {
  #store = inject(Store)
  readonly contributions$ = this.#store.select(contributionsFeature.selectContributions)
  readonly displayedColumns = ['description', 'amount']

  ngOnInit(): void {
    this.#store.dispatch(ContributionsActions.loadContributions())
  }

  ngOnDestroy(): void {
    this.#store.dispatch(ContributionsActions.cleanContributions())
  }
}
