import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.authSubs = this.store.select('auth').subscribe(({ user }) => {
      this.user = user;
      if (!user) this.router.navigate(['auth']);
    });
  }

  ngOnDestroy() {
    this.authSubs?.unsubscribe();
  }

  signout() {
    this.store.dispatch(AuthActions.signout());
  }
}
