import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, switchMap, filter, first } from 'rxjs/operators'
import { of } from 'rxjs'

import { Actions, createEffect, ofType } from '@ngrx/effects'

import { AttendencesActions } from '../actions/attendences.actions'
import { AttendenceService } from 'src/app/services/attendence.service'
import { Store } from '@ngrx/store'
import { userFeature } from '@state/reducers/user.reducer'

@Injectable()
export class AttendencesEffect {
  constructor(
    private actions$: Actions,
    private attendencesService: AttendenceService,
    private store: Store
  ) {}

  loadUserMeetingsAttendance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendencesActions.loadUserMeetingsAttendance),
      switchMap(() =>
        this.store.select(userFeature.selectUser).pipe(
          filter((user) => user !== null),
          first()
        )
      ),
      switchMap((user) => this.attendencesService.getAllByUser(user!.id)),
      map((userMeetingsAttendance) =>
        AttendencesActions.loadUserMeetingsAttendanceSuccess({ userMeetingsAttendance })
      ),
      catchError((e) => of(AttendencesActions.error({ e })))
    )
  )

  loadByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendencesActions.loadByUser),
      mergeMap(({ userId }) =>
        this.attendencesService.getByUser(userId).pipe(
          map((attendences) => AttendencesActions.load({ attendences })),
          catchError((e) => of(AttendencesActions.error({ e })))
        )
      )
    )
  )

  loadByMeeting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendencesActions.loadByMeeting),
      mergeMap(({ meetingId }) =>
        this.attendencesService.getByMeeting(meetingId).pipe(
          map((attendences) => AttendencesActions.loadByMeetingSuccess({ attendences })),
          catchError((e) => of(AttendencesActions.error({ e })))
        )
      )
    )
  )

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendencesActions.create),
      mergeMap(({ meetingId }) =>
        this.store.select(userFeature.selectUser).pipe(
          filter((user) => user !== null),
          first(),
          switchMap((user) => this.attendencesService.create(user!.id, meetingId)),
          map((attendence) => AttendencesActions.createSuccess({ attendence })),
          catchError((e) => of(AttendencesActions.error({ e })))
        )
      )
    )
  )
}
