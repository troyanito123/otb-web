import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as ExtraContActions from 'src/app/state/actions/extra-contribution.action';

@Component({
  selector: 'app-extra-contributions',
  templateUrl: './extra-contributions.component.html',
  styleUrls: ['./extra-contributions.component.scss'],
})
export class ExtraContributionsComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.store.dispatch(ExtraContActions.clean());
  }
}
