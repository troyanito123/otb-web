import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IncomeModel } from '@models/income.model';
import { AppState } from '@state/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrls: ['./income-detail.component.scss'],
})
export class IncomeDetailComponent implements OnInit, OnDestroy {
  public income?: IncomeModel;
  private incomeSubs?: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.incomeSubs = this.store.select('incomes').subscribe(({ income }) => {
      this.income = income;
    });
  }

  ngOnDestroy(): void {
    this.incomeSubs?.unsubscribe();
  }
}
