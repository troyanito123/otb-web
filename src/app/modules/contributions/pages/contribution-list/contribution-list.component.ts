import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Contribution } from 'src/app/models/contribution.model';
import * as ContributionsActions from 'src/app/state/actions/contributions.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-contribution-list',
  templateUrl: './contribution-list.component.html',
  styleUrls: ['./contribution-list.component.scss'],
})
export class ContributionListComponent implements OnInit, OnDestroy {
  public contributions: Contribution[] = [];
  private contributionsSubs!: Subscription;

  displayedColumns = ['description', 'amount'];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(ContributionsActions.loadContributions());
    this.contributionsSubs = this.store
      .select('contributions')
      .subscribe(({ contributions }) => {
        this.contributions = contributions;
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ContributionsActions.cleanContributions());
    this.contributionsSubs?.unsubscribe();
  }
}
