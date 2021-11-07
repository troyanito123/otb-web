import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as MeetingsActions from 'src/app/state/actions/meetings.actions';

import { Subscription } from 'rxjs';

import { Meeting } from 'src/app/models/meeting.model';
@Component({
  selector: 'app-user-attendences',
  templateUrl: './user-attendences.component.html',
  styleUrls: ['./user-attendences.component.scss'],
})
export class UserAttendencesComponent implements OnInit, OnDestroy {
  public meetings: Meeting[] = [];
  private meetingsSubs!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeStore();

    this.store.dispatch(MeetingsActions.load());
  }

  ngOnDestroy(): void {
    this.store.dispatch(MeetingsActions.clean());

    this.unsubscribeStore();
  }

  private subscribeStore() {
    this.meetingsSubs = this.store
      .select('meetings')
      .subscribe(({ meetings }) => {
        this.meetings = meetings;
      });
  }

  private unsubscribeStore() {
    this.meetingsSubs?.unsubscribe();
  }
}
