import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ContributionPaid } from 'src/app/models/contribution-paid.model';
import { PreContribution } from 'src/app/models/pre-contributions';
import { PrePayment } from 'src/app/models/pre-payment';
import { User } from 'src/app/models/user.model';
import { cleanContributionsPaid } from 'src/app/state/actions/contributions-paid.action';
import { cleanPayment } from 'src/app/state/actions/pre-payment.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-user-receipt-view',
  templateUrl: './user-receipt-view.component.html',
  styleUrls: ['./user-receipt-view.component.scss'],
})
export class UserReceiptViewComponent implements OnInit, OnDestroy {
  public user!: User | null;
  public auth!: User | null;
  public preContribution!: PreContribution | null;
  public prePayments: PrePayment[] = [];

  private userSubs!: Subscription;
  private authSubs!: Subscription;
  private preContributionSubs!: Subscription;
  private prePaymentsSubs!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.listenerStore();
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.authSubs?.unsubscribe();
    this.preContributionSubs?.unsubscribe();
    this.prePaymentsSubs?.unsubscribe();
  }

  private listenerStore() {
    this.userSubs = this.store
      .select('user')
      .subscribe(({ user }) => (this.user = user));
    this.authSubs = this.store
      .select('auth')
      .subscribe(({ user }) => (this.auth = user));
    this.prePaymentsSubs = this.store
      .select('prePayment')
      .subscribe(({ prePayments }) => {
        this.prePayments = prePayments;
      });
    this.preContributionSubs = this.store
      .select('preContribution')
      .subscribe(
        ({ preContribution }) => (this.preContribution = preContribution)
      );
  }
}
