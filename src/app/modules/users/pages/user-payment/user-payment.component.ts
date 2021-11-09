import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MonthlyPayment } from 'src/app/models/monthly-payment.model';
import { User } from 'src/app/models/user.model';
import * as MonthlyPaymentsAction from 'src/app/state/actions/monthly-payments.action';
import * as MonthlyPaymentsMadeAction from 'src/app/state/actions/monthly-payments-made.action';
import * as PrePaymentActions from 'src/app/state/actions/pre-payment.action';
import { AppState } from 'src/app/state/app.reducer';
import { MonthlyPaymentMade } from 'src/app/models/monthly-payment-made';
import { PrePayment } from 'src/app/models/pre-payment';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.scss'],
})
export class UserPaymentComponent implements OnInit, OnDestroy {
  private userSubs!: Subscription;
  public user!: User | null;

  private monthlyPaymentsSubs!: Subscription;
  public monthlyPayments: MonthlyPayment[] = [];

  private monthlyPaymentsMadeSubs!: Subscription;
  public monthlyPaymentsMade: MonthlyPaymentMade[] = [];

  yearInput = new FormControl('2021', Validators.required);
  years = ['2021', '2022', '2023'];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSubs = this.store.select('user').subscribe(({ user }) => {
      this.user = user;
      this.loadPayments(user!.id, this.yearInput.value);
    });

    this.listenerPayments();

    this.yearInput.valueChanges.subscribe((year) =>
      this.loadPayments(this.user!.id, year)
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(MonthlyPaymentsAction.clean());
    this.store.dispatch(MonthlyPaymentsMadeAction.clean());
    this.userSubs?.unsubscribe();
    this.monthlyPaymentsSubs?.unsubscribe();
    this.monthlyPaymentsMadeSubs?.unsubscribe();
  }

  addToPrePaid(prePayment: PrePayment) {
    this.store.dispatch(PrePaymentActions.addPayment({ prePayment }));
  }

  private loadPayments(id: number, year: string) {
    this.store.dispatch(MonthlyPaymentsAction.loadPayments({ year }));
    this.store.dispatch(
      MonthlyPaymentsMadeAction.loadPaymentsMade({ id, year })
    );
  }

  private listenerPayments() {
    this.monthlyPaymentsSubs = this.store
      .select('monthlyPayment')
      .subscribe(
        ({ monthlyPayments }) => (this.monthlyPayments = monthlyPayments)
      );

    this.monthlyPaymentsMadeSubs = this.store
      .select('monthlyPaymentMade')
      .subscribe(
        ({ monthlyPaymentsMade }) =>
          (this.monthlyPaymentsMade = monthlyPaymentsMade)
      );
  }
}
