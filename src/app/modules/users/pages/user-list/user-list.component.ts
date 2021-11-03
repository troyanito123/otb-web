import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as UsersActions from 'src/app/state/actions/users.action';

import { User } from 'src/app/models/user.model';
import { cleanUser } from 'src/app/state/actions/user.action';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  private usersSubs!: Subscription;

  public users: User[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(UsersActions.load());
    this.usersSubs = this.store.select('users').subscribe(({ users }) => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    this.usersSubs?.unsubscribe();
  }
}
