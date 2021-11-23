import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as MonthlyPaymentActions from 'src/app/state/actions/monthly-payment.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monthly-payments-view',
  templateUrl: './monthly-payments-view.component.html',
  styleUrls: ['./monthly-payments-view.component.scss'],
})
export class MonthlyPaymentsViewComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) =>
      this.store.dispatch(MonthlyPaymentActions.load({ id }))
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(MonthlyPaymentActions.clean());
  }
}
