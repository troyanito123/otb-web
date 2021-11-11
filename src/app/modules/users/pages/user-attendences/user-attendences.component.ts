import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.reducer';
import * as MeetingsActions from 'src/app/state/actions/meetings.actions';
import * as AttendencesActions from 'src/app/state/actions/attendences.actions';

import { Subscription } from 'rxjs';

import { Meeting } from 'src/app/models/meeting.model';
import { Attendence } from 'src/app/models/attendence.model';
import { User } from 'src/app/models/user.model';
import { AttendenceMeeting } from 'src/app/models/attendence-meeting.mode';
import { ToAttendencePipe } from 'src/app/pipes/to-attendence.pipe';
@Component({
  selector: 'app-user-attendences',
  templateUrl: './user-attendences.component.html',
  styleUrls: ['./user-attendences.component.scss'],
})
export class UserAttendencesComponent implements OnInit, OnDestroy {
  public meetings: Meeting[] = [];
  private meetingsSubs!: Subscription;

  public attendences: Attendence[] = [];
  private attendencesSubs!: Subscription;

  public user!: User | null;
  private userSubs!: Subscription;

  public attendenceMeeting: AttendenceMeeting[] = [];

  attendenceMeetingColumns = ['name', 'date', 'isPresent', 'fine', 'option'];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeStore();

    this.store.dispatch(MeetingsActions.load());
  }

  ngOnDestroy(): void {
    this.store.dispatch(MeetingsActions.clean());
    this.store.dispatch(AttendencesActions.clean());

    this.unsubscribeStore();
  }

  public markAttendence(item: AttendenceMeeting) {
    this.store.dispatch(
      AttendencesActions.create({ userId: this.user!.id, meetingId: item.id })
    );
  }

  public canAsist(date: Date) {
    const meetingDate = new Date(date);
    const todayDate = new Date();
    return meetingDate > todayDate;
  }

  private subscribeStore() {
    this.userSubs = this.store.select('user').subscribe(({ user }) => {
      this.user = user;
      this.store.dispatch(
        AttendencesActions.loadByUser({ userId: this.user!.id })
      );
    });

    this.meetingsSubs = this.store
      .select('meetings')
      .subscribe(({ meetings }) => {
        this.meetings = meetings;
        this.attendenceMeeting = new ToAttendencePipe().transform(
          this.meetings,
          this.attendences
        );
      });

    this.attendencesSubs = this.store
      .select('attendences')
      .subscribe(({ attendences }) => {
        this.attendences = attendences;
        this.attendenceMeeting = new ToAttendencePipe().transform(
          this.meetings,
          this.attendences
        );
      });
  }

  private unsubscribeStore() {
    this.meetingsSubs?.unsubscribe();
    this.attendencesSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }
}
