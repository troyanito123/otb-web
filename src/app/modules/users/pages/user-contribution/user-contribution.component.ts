import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Contribution } from 'src/app/models/contribution.model';
import { User } from 'src/app/models/user.model';
import { loadContributions } from 'src/app/state/actions/contributions.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-user-contribution',
  templateUrl: './user-contribution.component.html',
  styleUrls: ['./user-contribution.component.scss'],
})
export class UserContributionComponent implements OnInit, OnDestroy {
  public user!: User | null;
  private userSubs!: Subscription;

  public contributions: Contribution[] = [];
  private contributionsSubs!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.listenerStore();
    this.store.dispatch(loadContributions());
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.contributionsSubs?.unsubscribe();
  }

  private listenerStore() {
    this.userSubs = this.store
      .select('user')
      .subscribe(({ user }) => (this.user = user));
    this.contributionsSubs = this.store
      .select('contributions')
      .subscribe(({ contributions }) => (this.contributions = contributions));
  }
}
