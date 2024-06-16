import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import { Actions, createEffect, ofType } from '@ngrx/effects'

import { MeetingActions } from '../actions/meeting.actions'
import { MeetingService } from 'src/app/services/meeting.service'
import { Router } from '@angular/router'

@Injectable()
export class MeetingEffect {
  constructor(
    private actions$: Actions,
    private meetingService: MeetingService,
    private router: Router
  ) {}

  loadMeeting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingActions.load),
      mergeMap(({ id }) =>
        this.meetingService.getOne(id).pipe(
          map((meeting) => MeetingActions.loadSuccess({ meeting })),
          catchError((e) => of(MeetingActions.error({ e })))
        )
      )
    )
  )

  created$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingActions.create),
      mergeMap(({ data, forwardSupplier }) =>
        this.meetingService.create(data).pipe(
          tap((meeting) => {
            this.router.navigateByUrl(forwardSupplier(meeting.id))
          }),
          map((meeting) => MeetingActions.loadSuccess({ meeting })),
          catchError((e) => of(MeetingActions.error({ e })))
        )
      )
    )
  )

  updated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingActions.update),
      mergeMap(({ id, data, forwardSupplier }) =>
        this.meetingService.update(id, data).pipe(
          tap((meeting) => {
            this.router.navigateByUrl(forwardSupplier(meeting.id))
          }),
          map((meeting) => MeetingActions.loadSuccess({ meeting })),
          catchError((e) => of(MeetingActions.error({ e })))
        )
      )
    )
  )

  removed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingActions.remove),
      mergeMap(({ id, forwardSupplier }) =>
        this.meetingService.remove(id).pipe(
          map((meeting) => MeetingActions.loadSuccess({ meeting })),
          tap(() => {
            this.router.navigateByUrl(forwardSupplier())
          }),
          catchError((e) => of(MeetingActions.error({ e })))
        )
      )
    )
  )
}
