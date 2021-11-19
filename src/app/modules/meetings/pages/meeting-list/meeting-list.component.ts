import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as MeetingsActions from 'src/app/state/actions/meetings.actions';

import { Meeting } from 'src/app/models/meeting.model';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss'],
})
export class MeetingListComponent implements OnInit, OnDestroy {
  public meetings: Meeting[] = [];
  private meetingsSubs!: Subscription;

  displayedColumns = ['name', 'date'];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeStore();
    this.store.dispatch(MeetingsActions.load());
  }

  ngOnDestroy(): void {
    this.unsubcribeStore();
  }

  private subscribeStore() {
    this.meetingsSubs = this.store
      .select('meetings')
      .subscribe(({ meetings }) => {
        this.meetings = meetings;
      });
  }

  private unsubcribeStore() {
    this.meetingsSubs?.unsubscribe();
  }
}
