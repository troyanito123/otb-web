import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Meeting } from 'src/app/models/meeting.model';
import { AppState } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-meeting-edit',
  templateUrl: './meeting-edit.component.html',
  styleUrls: ['./meeting-edit.component.scss'],
})
export class MeetingEditComponent implements OnInit {
  public meeting!: Meeting | null;
  private meetingSubs!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeStore();
  }

  ngOnDestroy(): void {
    this.unsubscribeStore();
  }

  private subscribeStore() {
    this.meetingSubs = this.store.select('meeting').subscribe(({ meeting }) => {
      this.meeting = meeting;
    });
  }

  private unsubscribeStore() {
    this.meetingSubs?.unsubscribe();
  }
}
