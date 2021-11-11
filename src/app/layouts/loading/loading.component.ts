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
  }

  ngOnDestroy(): void {
    this.authSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
    this.monthlyPaymentsMadeSubs?.unsubscribe();
    this.contributionsPaidSubs?.unsubscribe();
    this.certificationSubs?.unsubscribe();
    this.attendencesSubs?.unsubscribe();
  }
}
