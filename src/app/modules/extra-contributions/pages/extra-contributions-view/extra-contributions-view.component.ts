import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/state/app.reducer';
import * as ExtraContActions from 'src/app/state/actions/extra-contribution.action';

@Component({
  selector: 'app-extra-contributions-view',
  templateUrl: './extra-contributions-view.component.html',
  styleUrls: ['./extra-contributions-view.component.scss'],
})
export class ExtraContributionsViewComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.store.dispatch(ExtraContActions.loadOne({ id }));
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ExtraContActions.unSetCurrent());
  }
}
