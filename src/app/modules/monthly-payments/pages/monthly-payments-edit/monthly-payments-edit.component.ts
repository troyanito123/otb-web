import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as MonthlyPaymentActions from 'src/app/state/actions/monthly-payment.action';

import { MonthlyPayment } from 'src/app/models/monthly-payment.model';

@Component({
  selector: 'app-monthly-payments-edit',
  templateUrl: './monthly-payments-edit.component.html',
  styleUrls: ['./monthly-payments-edit.component.scss'],
})
export class MonthlyPaymentsEditComponent implements OnInit, OnDestroy {
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
