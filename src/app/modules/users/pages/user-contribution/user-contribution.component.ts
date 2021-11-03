import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ContributionPaid } from 'src/app/models/contribution-paid.model';
import { Contribution } from 'src/app/models/contribution.model';
import { PreContribution } from 'src/app/models/pre-contributions';
import { User } from 'src/app/models/user.model';
import {
  cleanContributionsPaid,
  createContributionsPaid,
  loadContributionsPaid,
} from 'src/app/state/actions/contributions-paid.action';
import {
  cleanContributions,
  loadContributions,
} from 'src/app/state/actions/contributions.action';
import { setPreContribution } from 'src/app/state/actions/pre-constribution.action';
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

  public contributionsPaid: ContributionPaid[] = [];
  private contributionsPaidSubs!: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.listenerStore();
    this.store.dispatch(loadContributions());
  }

  ngOnDestroy(): void {
    // this.store.dispatch(cleanContributionsPaid());
    this.store.dispatch(cleanContributions());
    this.userSubs?.unsubscribe();
    this.contributionsSubs?.unsubscribe();
    this.contributionsPaidSubs?.unsubscribe();
  }

  payContribution(preContribution: PreContribution) {
    const { amountToPay: amount, id: contributionId } = preContribution;
    this.store.dispatch(
      createContributionsPaid({ amount, contributionId, userId: this.user!.id })
    );

    this.store.dispatch(setPreContribution({ preContribution }));
  }

  private listenerStore() {
    this.userSubs = this.store.select('user').subscribe(({ user }) => {
      this.user = user;
      if (user)
        this.store.dispatch(loadContributionsPaid({ userId: this.user!.id }));
    });
    this.contributionsSubs = this.store
      .select('contributions')
      .subscribe(({ contributions }) => (this.contributions = contributions));
    this.contributionsPaidSubs = this.store
      .select('contributionsPaid')
      .subscribe(({ contributionsPaid, saved }) => {
        this.contributionsPaid = contributionsPaid;
        if (saved) {
          this.router.navigate(['users', this.user!.id, 'receipt-view']);
        }
      });
  }
}
