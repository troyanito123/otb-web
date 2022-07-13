import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.reducer';
import * as IncomeActions from '@state/actions/incomes.action';
import { IncomeModel } from '@models/income.model';
import { Subscription } from 'rxjs';
import { distinct, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-incomes-list',
  templateUrl: './user-incomes-list.component.html',
  styleUrls: ['./user-incomes-list.component.scss'],
})
export class UserIncomesListComponent implements OnInit, OnDestroy {
  public incomes: IncomeModel[] = [];
  private incomeSubs?: Subscription;

  displayedColumns: string[] = ['amount', 'date', 'description', 'options'];
  private userId?: number;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store
      .select('user')
      .pipe(
        distinct(),
        tap(({ user }) => {
          if (user) {
            this.userId = user.id;
            this.store.dispatch(IncomeActions.loadByUser({ userId: user.id }));
          }
        })
      )
      .subscribe();

    this.incomeSubs = this.store
      .select('incomes')
      .subscribe(({ incomes, income }) => {
        this.incomes = incomes;
        if (income)
          this.router.navigate([
            'private/users',
            this.userId,
            'incomes',
            'new',
          ]);
      });
  }

  ngOnDestroy(): void {
    this.incomeSubs?.unsubscribe();
    // this.store.dispatch(IncomeActions.clean());
  }

  editIncome(incomeId: number) {
    this.store.dispatch(IncomeActions.load({ id: incomeId }));
  }
}
