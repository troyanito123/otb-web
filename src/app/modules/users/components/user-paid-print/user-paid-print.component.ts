import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as PrePaidActions from 'src/app/state/actions/pre-payment.action';

import { PrePayment } from 'src/app/models/pre-payment';

@Component({
  selector: 'app-user-paid-print',
  templateUrl: './user-paid-print.component.html',
  styleUrls: ['./user-paid-print.component.scss'],
})
export class UserPaidPrintComponent implements OnInit, OnDestroy {
  public prePayments: PrePayment[] = [];
  private prePaymentsSubs!: Subscription;

  public total = 0;

  @Input() userId!: number;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.prePaymentsSubs = this.store
      .select('prePayment')
      .subscribe(({ prePayments }) => {
        this.prePayments = prePayments;
        this.total = this.prePayments.reduce(
          (counter, item) => counter + item.amountForPay,
          0
        );
      });
  }

  ngOnDestroy(): void {
    this.prePaymentsSubs?.unsubscribe();
  }

  substractToPrePaid(id: number) {
    this.store.dispatch(PrePaidActions.subtractPayment({ id }));
  }

  confirmPaid() {
    console.log('confirmar pago');
  }
}
