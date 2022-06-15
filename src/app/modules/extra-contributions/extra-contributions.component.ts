import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as ExtraContActions from 'src/app/state/actions/extra-contribution.action';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-extra-contributions',
  templateUrl: './extra-contributions.component.html',
  styleUrls: ['./extra-contributions.component.scss'],
})
export class ExtraContributionsComponent implements OnInit, OnDestroy {
  public auth!: User | null;
  public authSubs?: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.authSubs = this.store.select('auth').subscribe(({ user }) => {
      this.auth = user;
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ExtraContActions.clean());
    this.authSubs?.unsubscribe;
  }
}
