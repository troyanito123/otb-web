import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ContributionActions from 'src/app/state/actions/contribution.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-contribution-view',
  templateUrl: './contribution-view.component.html',
  styleUrls: ['./contribution-view.component.scss'],
})
export class ContributionViewComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) =>
      this.store.dispatch(ContributionActions.load({ id }))
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(ContributionActions.clean());
  }
}
