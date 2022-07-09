import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public auth!: User | null;
  private authSubs?: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.authSubs = this.store.select('auth').subscribe(({ user }) => {
      this.auth = user;
    });
  }

  ngOnDestroy(): void {
    this.authSubs?.unsubscribe();
  }
}
