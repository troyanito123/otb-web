import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { MeetingsActions } from 'src/app/state/actions/meetings.actions'
import { meetingsFeature } from '@state/reducers/meetings.reducer'

@Component({
    selector: 'app-meeting-list',
    templateUrl: './meeting-list.component.html',
    styleUrls: ['./meeting-list.component.scss'],
    standalone: false
})
export class MeetingListComponent {
  readonly displayedColumns = ['name', 'date']
  readonly meetings$ = this.store.select(meetingsFeature.selectMeetings)

  constructor(private store: Store) {
    this.store.dispatch(MeetingsActions.load())
  }
}
