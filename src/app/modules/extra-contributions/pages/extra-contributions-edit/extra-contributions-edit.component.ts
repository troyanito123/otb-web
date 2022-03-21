import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ExtraContribution } from 'src/app/models/extra-contribution.interface';
import * as ExtraContActions from 'src/app/state/actions/extra-contribution.action';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-extra-contributions-edit',
  templateUrl: './extra-contributions-edit.component.html',
  styleUrls: ['./extra-contributions-edit.component.scss'],
})
export class ExtraContributionsEditComponent implements OnInit, OnDestroy {
  private stateSubs?: Subscription;
  public extraContribution?: ExtraContribution;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(ExtraContActions.partialClean());
    this.stateSubs = this.store
      .select('extraContributions')
      .subscribe(({ extraContribution }) => {
        this.extraContribution = extraContribution;
      });
  }

  ngOnDestroy(): void {
    this.stateSubs?.unsubscribe();
  }
}
