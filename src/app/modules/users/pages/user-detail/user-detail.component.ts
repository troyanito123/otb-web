import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  public user!: User | null;
  private userSubs!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeStore();
  }

  ngOnDestroy(): void {
    this.unsubscribeStore();
  }

  private subscribeStore() {
    this.userSubs = this.store
      .select('user')
      .subscribe(({ user }) => (this.user = user));
  }

  private unsubscribeStore() {
    this.userSubs?.unsubscribe();
  }
}
