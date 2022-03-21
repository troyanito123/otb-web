import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as ExtraContActions from 'src/app/state/actions/extra-contribution.action';

import { ExtraContribution } from 'src/app/models/extra-contribution.interface';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-extra-contributions-list',
  templateUrl: './extra-contributions-list.component.html',
  styleUrls: ['./extra-contributions-list.component.scss'],
})
export class ExtraContributionsListComponent implements OnInit, OnDestroy {
  public extraContributions: ExtraContribution[] = [];
  private storeSubs?: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select('extraContributions')
      .subscribe(({ extraContributions }) => {
        this.extraContributions = extraContributions;
      });

    this.store.dispatch(ExtraContActions.loadAll());
  }

  ngOnDestroy(): void {
    this.storeSubs?.unsubscribe();
  }
}
