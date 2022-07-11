import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IncomeModel } from '@models/income.model';
import { AppState } from '@state/app.reducer';

@Component({
  selector: 'app-income-detail',
  templateUrl: './income-detail.component.html',
  styleUrls: ['./income-detail.component.scss'],
})
export class IncomeDetailComponent implements OnInit {
  public income?: IncomeModel;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('incomes').subscribe(({ income }) => {
      this.income = income;
    });
  }
}
