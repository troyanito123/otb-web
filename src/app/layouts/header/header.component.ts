import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/state/app.reducer';
import * as AuthActions from 'src/app/state/actions/auth.action';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private user!: User | null;

  private authSubs!: Subscription;

  get isLogged() {
    return !!this.user;
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.authSubs = this.store
      .select('auth')
      .subscribe(({ user }) => (this.user = user));
  }

  ngOnDestroy() {
    this.authSubs?.unsubscribe();
  }

  signout() {
    this.store.dispatch(AuthActions.signout());
  }
}
