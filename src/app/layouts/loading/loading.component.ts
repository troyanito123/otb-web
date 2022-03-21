import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  private authSubs!: Subscription;
  private userSubs!: Subscription;
  private monthlyPaymentsMadeSubs!: Subscription;
  private contributionsPaidSubs!: Subscription;
  private certificationSubs!: Subscription;
  private attendencesSubs!: Subscription;
  private expenseSubs!: Subscription;
  private meetingsSubs!: Subscription;
  private meetingSubs!: Subscription;
  private monthlyPaymentSubs!: Subscription;
  private contributionSubs!: Subscription;
  private finesSubs!: Subscription;
  private certificationsSubs!: Subscription;
  private extraContributionsSubs!: Subscription;

  loading = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.authSubs = this.store
      .select('auth')
      .subscribe(({ loading }) => (this.loading = loading));
    this.userSubs = this.store
      .select('user')
      .subscribe(({ loading }) => (this.loading = loading));
    this.monthlyPaymentsMadeSubs = this.store
      .select('monthlyPaymentMade')
      .subscribe(({ loading }) => (this.loading = loading));
    this.contributionsPaidSubs = this.store
      .select('contributionsPaid')
      .subscribe(({ loading }) => (this.loading = loading));
    this.contributionsPaidSubs = this.store
      .select('certification')
      .subscribe(({ loading }) => (this.loading = loading));
    this.attendencesSubs = this.store
      .select('attendences')
      .subscribe(({ loading }) => (this.loading = loading));
    this.expenseSubs = this.store
      .select('expense')
      .subscribe(({ loading }) => (this.loading = loading));
    this.meetingsSubs = this.store
      .select('meetings')
      .subscribe(({ loading }) => (this.loading = loading));
    this.meetingSubs = this.store
      .select('meeting')
      .subscribe(({ loading }) => (this.loading = loading));
    this.meetingSubs = this.store
      .select('monthlyPayment')
      .subscribe(({ loading }) => (this.loading = loading));
    this.contributionSubs = this.store
      .select('contribution')
      .subscribe(({ loading }) => (this.loading = loading));
    this.finesSubs = this.store
      .select('fines')
      .subscribe(({ loading }) => (this.loading = loading));
    this.certificationsSubs = this.store
      .select('certifications')
      .subscribe(({ loading }) => (this.loading = loading));
    this.extraContributionsSubs = this.store
      .select('extraContributions')
      .subscribe(({ loading }) => (this.loading = loading));
  }

  ngOnDestroy(): void {
    this.authSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
    this.monthlyPaymentsMadeSubs?.unsubscribe();
    this.contributionsPaidSubs?.unsubscribe();
    this.certificationSubs?.unsubscribe();
    this.attendencesSubs?.unsubscribe();
    this.expenseSubs?.unsubscribe();
    this.meetingsSubs?.unsubscribe();
    this.meetingSubs?.unsubscribe();
    this.monthlyPaymentSubs?.unsubscribe();
    this.contributionSubs?.unsubscribe();
    this.finesSubs?.unsubscribe();
    this.certificationsSubs?.unsubscribe();
    this.extraContributionsSubs?.unsubscribe();
  }
}
