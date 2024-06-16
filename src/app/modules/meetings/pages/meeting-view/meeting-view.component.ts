import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Store } from '@ngrx/store'
import { MeetingActions } from 'src/app/state/actions/meeting.actions'

@Component({
  selector: 'app-meeting-view',
  templateUrl: './meeting-view.component.html',
  styleUrls: ['./meeting-view.component.scss'],
})
export class MeetingViewComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => this.store.dispatch(MeetingActions.load({ id })))
  }

  ngOnDestroy(): void {
    this.store.dispatch(MeetingActions.clean())
  }
}
