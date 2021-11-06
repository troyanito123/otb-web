import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ContributionPaid } from 'src/app/models/contribution-paid.model';
import { Contribution } from 'src/app/models/contribution.model';
import { PreContribution } from 'src/app/models/pre-contributions';
import { Transaction } from 'src/app/models/transaction.model';
import { User } from 'src/app/models/user.model';
import * as ContributionsPaidActions from 'src/app/state/actions/contributions-paid.action';
import * as ContributionsActions from 'src/app/state/actions/contributions.action';
import * as PreContributionsActions from 'src/app/state/actions/pre-constribution.action';
import * as TransactionsActions from 'src/app/state/actions/transactions.action';
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

  public preContributions: PreContribution[] = [];
  public total = 0;
  private precontributionsSubs!: Subscription;

  inputDate = new FormControl(new Date().toISOString(), [Validators.required]);

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.listenerStore();
    this.store.dispatch(ContributionsActions.loadContributions());
  }

  ngOnDestroy(): void {
    this.store.dispatch(ContributionsActions.cleanContributions());
    this.store.dispatch(ContributionsPaidActions.cleanContributionsPaid());

    this.userSubs?.unsubscribe();
    this.contributionsSubs?.unsubscribe();
    this.contributionsPaidSubs?.unsubscribe();
    this.precontributionsSubs?.unsubscribe();
  }

  addPreContributionPaid(preContribution: PreContribution) {
    this.store.dispatch(
      PreContributionsActions.addContributionPaid({ preContribution })
    );
  }

  substractPreContributionPaid(preContribution: PreContribution) {
    this.store.dispatch(
      PreContributionsActions.substractContributionPaid({ preContribution })
    );
  }

  confirmPay() {
    if (!this.preContributions.length) {
      console.log('no hay que pagar');
      return;
    }
    const contributionsId = JSON.stringify(
      this.preContributions.map((p) => p.id)
    );
    const userId = this.user!.id;
    this.store.dispatch(
      ContributionsPaidActions.createManyContributionsPaid({
        userId,
        contributionsId,
        date: this.inputDate.value,
      })
    );
  }

  private listenerStore() {
    this.userSubs = this.store.select('user').subscribe(({ user }) => {
      this.user = user;
      if (user)
        this.store.dispatch(
          ContributionsPaidActions.loadContributionsPaid({
            userId: this.user!.id,
          })
        );
    });

    this.contributionsSubs = this.store
      .select('contributions')
      .subscribe(({ contributions }) => (this.contributions = contributions));

    this.contributionsPaidSubs = this.store
      .select('contributionsPaid')
      .subscribe(({ contributionsPaid, saved }) => {
        this.contributionsPaid = contributionsPaid;
        if (saved) {
          this.store.dispatch(
            TransactionsActions.addTransaction({
              transactions: this.generateTransactions(),
            })
          );
          this.store.dispatch(PreContributionsActions.clean());
          this.router.navigate(['users', this.user!.id, 'receipt-view']);
        }
      });

    this.precontributionsSubs = this.store
      .select('preContribution')
      .subscribe(({ preContributions, total }) => {
        this.preContributions = preContributions;
        this.total = total;
      });
  }

  private generateTransactions() {
    return this.preContributions.map(
      (p) => new Transaction(p.description, p.amountToPay, this.inputDate.value)
    );
  }
}
