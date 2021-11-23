import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.reducer';

import { MonthlyPayment } from 'src/app/models/monthly-payment.model';

@Component({
  selector: 'app-monthly-payments-detail',
  templateUrl: './monthly-payments-detail.component.html',
  styleUrls: ['./monthly-payments-detail.component.scss'],
})
export class MonthlyPaymentsDetailComponent implements OnInit, OnDestroy {
  public monthlyPayment!: MonthlyPayment | null;
  private monthlyPaymentSubs!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.monthlyPaymentSubs = this.store
      .select('monthlyPayment')
      .subscribe(({ monthlyPayment }) => {
        this.monthlyPayment = monthlyPayment;
      });
  }

  ngOnDestroy(): void {
    this.monthlyPaymentSubs?.unsubscribe();
  }
}
