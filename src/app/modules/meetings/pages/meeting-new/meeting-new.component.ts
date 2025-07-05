import { Component, inject } from '@angular/core'
import { MeetingData } from '@models/meeting.model'
import { Store } from '@ngrx/store'
import { MeetingActions } from '@state/actions/meeting.actions'

@Component({
    selector: 'app-meeting-new',
    template: ` <app-meeting-form (clickSave)="saveData($event)"></app-meeting-form> `,
    standalone: false
})
export class MeetingNewComponent {
  #store = inject(Store)

  public saveData(data: MeetingData) {
    this.#store.dispatch(
      MeetingActions.create({ data, forwardSupplier: (id: number) => `/private/meetings/${id}` })
    )
  }
}
