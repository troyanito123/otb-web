import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '@state/app.reducer';
import { IncomesActions } from '@state/actions/incomes.action';

@Component({
    selector: 'app-income-view',
    template: `<router-outlet></router-outlet>`,
    styles: [''],
    standalone: false
})
export class IncomeViewComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.store.dispatch(IncomesActions.load({ id }));
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(IncomesActions.clean());
  }
}
