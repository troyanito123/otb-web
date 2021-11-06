import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as MonthlyPaymentsMadeActions from 'src/app/state/actions/monthly-payments-made.action';
import * as PrePaymentActions from 'src/app/state/actions/pre-payment.action';
import * as TransactionsActions from 'src/app/state/actions/transactions.action';

import { PrePayment } from 'src/app/models/pre-payment';
import { User } from 'src/app/models/user.model';
import { Transaction } from 'src/app/models/transaction.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-pre-payment',
  templateUrl: './user-pre-payment.component.html',
  styleUrls: ['./user-pre-payment.component.scss'],
})
export class UserPrePaymentComponent implements OnInit, OnDestroy {
  public prePayments: PrePayment[] = [];
  private prePaymentsSubs!: Subscription;

  private monthlyPaymentsMadeSubs!: Subscription;

  public total = 0;

  public user!: User | null;
  private userSubs!: Subscription;

  inputDate = new FormControl(new Date().toISOString(), [Validators.required]);

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.listenerStore();
  }

  ngOnDestroy(): void {
    this.prePaymentsSubs?.unsubscribe();
    this.monthlyPaymentsMadeSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }

  substractToPrePaid(id: number) {
    this.store.dispatch(PrePaymentActions.subtractPayment({ id }));
  }

  confirmPaid() {
    if (!this.prePayments.length) {
      console.log('no hay que pagar');
      return;
    }
    const monthsId = JSON.stringify(this.prePayments.map((p) => p.id));

    this.store.dispatch(
      MonthlyPaymentsMadeActions.createManyPaymentsMade({
        userId: this.user!.id,
        monthsId,
        date: this.inputDate.value,
      })
    );
  }

  private listenerStore() {
    this.monthlyPaymentsMadeSubs = this.store
      .select('monthlyPaymentMade')
      .subscribe(({ saved }) => {
        if (saved) {
          this.store.dispatch(
            TransactionsActions.addTransaction({
              transactions: this.generateTransactions(),
            })
          );
          this.store.dispatch(PrePaymentActions.cleanPayment());

          this.router.navigate(['users', this.user!.id, 'receipt-view']);
        }
      });

    this.prePaymentsSubs = this.store
      .select('prePayment')
      .subscribe(({ prePayments }) => {
        this.prePayments = prePayments;
        this.total = this.prePayments.reduce(
          (counter, item) => counter + item.amountForPay,
          0
        );
      });

    this.userSubs = this.store
      .select('user')
      .subscribe(({ user }) => (this.user = user));
  }

  private generateTransactions() {
    return this.prePayments.map((p) => {
      const { month, year, amountForPay } = p;
      const description = `PAGO MENSUALIDAD DE: ${month} - ${year}`;
      return new Transaction(description, amountForPay, this.inputDate.value);
    });
  }
}
