import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as PrePaidActions from 'src/app/state/actions/pre-payment.action';

import { PrePayment } from 'src/app/models/pre-payment';
import { createManyPaymentsMade } from 'src/app/state/actions/monthly-payments-made.action';

@Component({
  selector: 'app-user-paid-print',
  templateUrl: './user-paid-print.component.html',
  styleUrls: ['./user-paid-print.component.scss'],
})
export class UserPaidPrintComponent implements OnInit, OnDestroy {
  public prePayments: PrePayment[] = [];
  private prePaymentsSubs!: Subscription;

  private monthlyPaymentsMadeSubs!: Subscription;

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

    this.listenerStore();
  }

  ngOnDestroy(): void {
    this.prePaymentsSubs?.unsubscribe();
    this.monthlyPaymentsMadeSubs?.unsubscribe();
  }

  substractToPrePaid(id: number) {
    this.store.dispatch(PrePaidActions.subtractPayment({ id }));
  }

  confirmPaid() {
    if (!this.prePayments.length) {
      console.log('no hay que pagar');
      return;
    }
    const monthsId = JSON.stringify(this.prePayments.map((p) => p.id));

    this.store.dispatch(
      createManyPaymentsMade({ userId: this.userId, monthsId })
    );
  }

  private listenerStore() {
    this.monthlyPaymentsMadeSubs = this.store
      .select('monthlyPaymentMade')
      .subscribe(({ saved }) => {
        if (saved) {
          const data = [...this.prePayments];
          this.store.dispatch(PrePaidActions.cleanPayment());
          console.log('generar Factura');
          console.log(data);
        }
      });
  }
}
