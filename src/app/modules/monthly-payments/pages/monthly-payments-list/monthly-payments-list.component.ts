import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as MonthlyPaymentsActions from 'src/app/state/actions/monthly-payments.action';
import { MonthlyPayment } from 'src/app/models/monthly-payment.model';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-monthly-payments-list',
  templateUrl: './monthly-payments-list.component.html',
  styleUrls: ['./monthly-payments-list.component.scss'],
})
export class MonthlyPaymentsListComponent implements OnInit, OnDestroy {
  public monthlyPayments: MonthlyPayment[] = [];
  private monthlyPaymentsSubs!: Subscription;

  public years = ['2021', '2022', '2023'];

  public inputYear = new FormControl('2021', [Validators.required]);

  displayedColumns = ['year', 'month', 'amount'];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(
      MonthlyPaymentsActions.loadPayments({ year: this.inputYear.value })
    );

    this.inputYear.valueChanges.subscribe((year) =>
      this.store.dispatch(MonthlyPaymentsActions.loadPayments({ year }))
    );
    this.subscribeStore();
  }

  ngOnDestroy(): void {
    this.store.dispatch(MonthlyPaymentsActions.clean());
    this.unsubscribeStore();
  }

  private subscribeStore() {
    this.monthlyPaymentsSubs = this.store
      .select('monthlyPayments')
      .subscribe(({ monthlyPayments }) => {
        this.monthlyPayments = monthlyPayments;
      });
  }

  private unsubscribeStore() {
    this.monthlyPaymentsSubs?.unsubscribe();
  }
}
