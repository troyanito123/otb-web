import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MonthlyPayment } from 'src/app/models/monthly-payment.model';
import { User } from 'src/app/models/user.model';
import * as MonthlyPaymentsAction from 'src/app/state/actions/monthly-payments.action';
import * as MonthlyPaymentsMadeAction from 'src/app/state/actions/monthly-payments-made.action';
import { loadUser } from 'src/app/state/actions/user.action';
import { AppState } from 'src/app/state/app.reducer';
import { MonthlyPaymentMade } from 'src/app/models/monthly-payment-made';

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

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    let userIdView: number;
    this.route.params.subscribe(({ id }) => {
      userIdView = id;
      this.store.dispatch(loadUser({ id }));
      this.loadPayments(id, this.yearInput.value);
    });

    this.userSubs = this.store
      .select('user')
      .subscribe(({ user }) => (this.user = user));

    this.listenerPayments();

    this.yearInput.valueChanges.subscribe((year) =>
      this.loadPayments(userIdView, year)
    );
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.monthlyPaymentsSubs?.unsubscribe();
    this.monthlyPaymentsMadeSubs?.unsubscribe();
  }

  pay(pay: any) {
    console.log('alista pago', pay);
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
