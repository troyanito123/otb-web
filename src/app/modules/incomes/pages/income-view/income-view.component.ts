import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '@state/app.reducer';
import * as IncomeActions from '@state/actions/incomes.action';

@Component({
  selector: 'app-income-view',
  templateUrl: './income-view.component.html',
  styleUrls: ['./income-view.component.scss'],
})
export class IncomeViewComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.store.dispatch(IncomeActions.load({ id }));
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(IncomeActions.clean());
  }
}
