import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Contribution } from 'src/app/models/contribution.model';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-contribution-edit',
  templateUrl: './contribution-edit.component.html',
  styleUrls: ['./contribution-edit.component.scss'],
})
export class ContributionEditComponent implements OnInit, OnDestroy {
  public contribution!: Contribution | null;
  private contributionSubs!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeStore();
  }

  ngOnDestroy(): void {
    this.unsubscribeStore();
  }

  private subscribeStore() {
    this.contributionSubs = this.store
      .select('contribution')
      .subscribe(({ contribution }) => {
        this.contribution = contribution;
      });
  }

  private unsubscribeStore() {
    this.contributionSubs?.unsubscribe();
  }
}
