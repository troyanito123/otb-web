import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ExtraContActions } from 'src/app/state/actions/extra-contribution.action';

@Component({
  selector: 'app-extra-contributions-view',
  template: `<router-outlet></router-outlet>`,
})
export class ExtraContributionsViewComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
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
