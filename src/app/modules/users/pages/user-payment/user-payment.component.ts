import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MonthlyPayment } from 'src/app/models/monthly-payment.model';
import { User } from 'src/app/models/user.model';
import * as MonthlyPaymentsAction from 'src/app/state/actions/monthly-payments.action';
import { loadUser } from 'src/app/state/actions/user.action';
import { AppState } from 'src/app/state/app.reducer';

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

  yearInput = new FormControl('2021', Validators.required);
  years = ['2021', '2022', '2023'];

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.store.dispatch(loadUser({ id }));
      this.loadPayments(this.yearInput.value);
    });

    this.userSubs = this.store
      .select('user')
      .subscribe(({ user }) => (this.user = user));

    this.listenerPayments();
    this.yearInput.valueChanges.subscribe((year) => this.loadPayments(year));
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.monthlyPaymentsSubs?.unsubscribe();
  }

  private loadPayments(year: string) {
    this.store.dispatch(MonthlyPaymentsAction.loadPayments({ year }));
  }

  private listenerPayments() {
    this.store
      .select('monthlyPayment')
      .subscribe(
        ({ monthlyPayments }) => (this.monthlyPayments = monthlyPayments)
      );
  }
}
