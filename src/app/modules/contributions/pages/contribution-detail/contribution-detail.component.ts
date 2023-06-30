import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import {ActivatedRoute, Router} from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as ContributionActions from 'src/app/state/actions/contribution.action';

import { Contribution } from 'src/app/models/contribution.model';

import { AlertComponent } from 'src/app/layouts/alert/alert.component';
import { DeleteDialogComponent } from 'src/app/layouts/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-contribution-detail',
  templateUrl: './contribution-detail.component.html',
  styleUrls: ['./contribution-detail.component.scss'],
})
export class ContributionDetailComponent implements OnInit, OnDestroy {
  public contribution!: Contribution | null;
  private contributionSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscribeStore();
  }

  ngOnDestroy(): void {
    this.unsubscribeStore();
  }

  public remove() {
    const dialog = this.matDialog.open(DeleteDialogComponent, {
      data: { name: 'aporte' },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result)
        this.store.dispatch(
          ContributionActions.remove({ id: this.contribution!.id })
        );
    });
  }

  private subscribeStore() {
    this.contributionSubs = this.store
      .select('contribution')
      .subscribe(({ contribution, removed }) => {
        this.contribution = contribution;

        if (removed)
          this.router.navigate(['../../'], {relativeTo: this.route}).then(() =>
            this.matDialog.open(AlertComponent, {
              data: {
                title: 'Aporte eliminado',
                content: 'Se elimino correctamente un aporte',
              },
            })
          );
      });
  }

  private unsubscribeStore() {
    this.contributionSubs?.unsubscribe();
  }
}
