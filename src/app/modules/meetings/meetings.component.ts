import { Component, OnDestroy, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { MeetingsActions } from '@state/actions/meetings.actions'

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
})
export class MeetingsComponent implements OnDestroy {
  #store = inject(Store)

  ngOnDestroy(): void {
    this.#store.dispatch(MeetingsActions.clean())
  }
}
