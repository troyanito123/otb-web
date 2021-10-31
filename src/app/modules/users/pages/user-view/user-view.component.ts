import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { cleanUser, loadUser } from 'src/app/state/actions/user.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit, OnDestroy {
  public user!: User | null;

  private userSubs!: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) =>
      this.store.dispatch(loadUser({ id }))
    );

    this.store.select('user').subscribe(({ user }) => (this.user = user));
  }

  ngOnDestroy(): void {
    this.store.dispatch(cleanUser());
    this.userSubs?.unsubscribe();
  }
}
