import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as MeetingActions from 'src/app/state/actions/meeting.actions';

import { DeleteDialogComponent } from 'src/app/layouts/delete-dialog/delete-dialog.component';
import { Meeting } from 'src/app/models/meeting.model';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.scss'],
})
export class MeetingDetailComponent implements OnInit, OnDestroy {
  public meeting!: Meeting | null;
  private meetingSubs!: Subscription;

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

  delete() {
    const dialog = this.matDialog.open(DeleteDialogComponent, {
      data: { name: 'reunión' },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(MeetingActions.remove({ id: this.meeting!.id }));
      }
    });
  }

  private subscribeStore() {
    this.meetingSubs = this.store
      .select('meeting')
      .subscribe(({ meeting, removed }) => {
        this.meeting = meeting;
        if (removed) this.router.navigate(['../../'], {relativeTo: this.route});
      });
  }

  private unsubscribeStore() {
    this.meetingSubs?.unsubscribe();
  }
}
