import { Component, inject } from '@angular/core'
import { MeetingData, MeetingType } from '@models/meeting.model'
import { Store } from '@ngrx/store'
import { MeetingActions } from '@state/actions/meeting.actions'
import { YEARS } from 'src/app/utils/gobal-data'

@Component({
  selector: 'app-meeting-new',
  template: `
    <app-meeting-form
      (clickSave)="saveData($event)"
      [years]="years"
      [types]="types"
    ></app-meeting-form>
  `,
  standalone: false,
})
export class MeetingNewComponent {
  #store = inject(Store)
  readonly years = YEARS
  readonly types = Object.values(MeetingType)

  public saveData(data: MeetingData) {
    this.#store.dispatch(
      MeetingActions.create({ data, forwardSupplier: (id: number) => `/private/meetings/${id}` })
    )
  }
}
