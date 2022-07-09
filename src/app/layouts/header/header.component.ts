import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/state/app.reducer';
import * as AuthActions from 'src/app/state/actions/auth.action';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/utils/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user!: User | null;

  private authSubs!: Subscription;

  get isLogged() {
    return !!this.user;
  }

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private sidenavService: SidenavService
  ) {}

  ngOnInit() {
    this.authSubs = this.store.select('auth').subscribe(({ user }) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.authSubs?.unsubscribe();
  }

  signout() {
    this.store.dispatch(AuthActions.signout());
    this.router.navigate(['/auth']);
  }

  sidebarToogle() {
    this.sidenavService.toggle();
  }
}
