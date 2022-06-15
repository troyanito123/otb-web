import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit, OnDestroy {
  public auth!: User | null;
  public authSubs?: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.authSubs = this.store.select('auth').subscribe(({ user }) => {
      this.auth = user;
    });
  }

  ngOnDestroy(): void {
    this.authSubs?.unsubscribe;
  }
}
