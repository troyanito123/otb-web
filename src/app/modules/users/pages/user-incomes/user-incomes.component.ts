import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {IncomesActions} from '@state/actions/incomes.action';
import { AppState } from '@state/app.reducer';

@Component({
  selector: 'app-user-incomes',
  templateUrl: './user-incomes.component.html',
  styleUrls: ['./user-incomes.component.scss'],
})
export class UserIncomesComponent implements OnDestroy {
  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    console.log('saliendo')
    this.store.dispatch(IncomesActions.clean());
  }
}
