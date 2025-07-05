import { Component, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { AttendencesActions } from 'src/app/state/actions/attendences.actions'
import { attendencesFeature } from '@state/reducers/attendences.reducer'

@Component({
    selector: 'app-user-attendences',
    templateUrl: './user-attendences.component.html',
    styleUrls: ['./user-attendences.component.scss'],
    standalone: false
})
export class UserAttendencesComponent implements OnDestroy {
  readonly attendenceMeetingColumns = ['name', 'date', 'isPresent', 'fine', 'option']

  readonly userMeetingsAttendance$ = this.store.select(
    attendencesFeature.selectUserMeetingsAttendance
  )

  constructor(private store: Store) {
    this.store.dispatch(AttendencesActions.loadUserMeetingsAttendance())
  }

  ngOnDestroy(): void {
    this.store.dispatch(AttendencesActions.clean())
  }

  public markAttendance(meetingId: number) {
    this.store.dispatch(AttendencesActions.create({ meetingId }))
  }

  public canAssist(date: Date) {
    const meetingDate = new Date(date)
    const todayDate = new Date()
    const limitDate = new Date(meetingDate.setHours(23, 59, 59))
    return limitDate > todayDate
  }
}
