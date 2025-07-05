import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { MeetingActions } from 'src/app/state/actions/meeting.actions'
import { DeleteDialogComponent } from 'src/app/layouts/delete-dialog/delete-dialog.component'
import { meetingFeature } from '@state/reducers/meeting.reducer'

@Component({
    selector: 'app-meeting-detail',
    templateUrl: './meeting-detail.component.html',
    styleUrls: ['./meeting-detail.component.scss'],
    standalone: false
})
export class MeetingDetailComponent {
  readonly meeting$ = this.store.select(meetingFeature.selectMeeting)

  constructor(private store: Store, private matDialog: MatDialog) {}

  delete(id: number) {
    const dialog = this.matDialog.open(DeleteDialogComponent, {
      data: { name: 'reunión' },
    })

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          MeetingActions.remove({ id, forwardSupplier: () => '/private/meetings' })
        )
      }
    })
  }
}
