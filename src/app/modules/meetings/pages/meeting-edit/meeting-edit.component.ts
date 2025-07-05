import { Component, inject } from '@angular/core'
import { MeetingData } from '@models/meeting.model'
import { Store } from '@ngrx/store'
import { MeetingActions } from '@state/actions/meeting.actions'
import { meetingFeature } from '@state/reducers/meeting.reducer'

@Component({
    selector: 'app-meeting-edit',
    template: `
    @if (meeting$ | async; as meeting) {
      <app-meeting-form
        [meeting]="meeting"
        (clickSave)="update($event, meeting.id)"
      ></app-meeting-form>
    }
    `,
    standalone: false
})
export class MeetingEditComponent {
  #store = inject(Store)
  readonly meeting$ = this.#store.select(meetingFeature.selectMeeting)

  public update(data: MeetingData, id: number) {
    this.#store.dispatch(
      MeetingActions.update({
        id,
        data,
        forwardSupplier: (id: number) => `/private/meetings/${id}`,
      })
    )
  }
}
