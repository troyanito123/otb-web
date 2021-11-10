import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  private authSubs!: Subscription;

  loading = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.authSubs = this.store
      .select('auth')
      .subscribe(({ loading }) => (this.loading = loading));
  }

  ngOnDestroy(): void {
    this.authSubs?.unsubscribe();
  }
}
