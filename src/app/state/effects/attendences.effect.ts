import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, switchMap, filter, first, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import { Actions, createEffect, ofType } from '@ngrx/effects'

import { AttendencesActions } from '../actions/attendences.actions'
import { AttendenceService } from 'src/app/services/attendence.service'
import { Store } from '@ngrx/store'
import { userFeature } from '@state/reducers/user.reducer'
import { PrintTableService } from '@services/print-table.service'

@Injectable()
export class AttendencesEffect {
  constructor(
    private actions$: Actions,
    private attendencesService: AttendenceService,
    private store: Store,
    private printTableService: PrintTableService,
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

  loadByMeeting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttendencesActions.loadByMeeting),
      mergeMap(({ meetingId, meetingName, handlerCallback }) =>
        this.attendencesService.getByMeeting(meetingId).pipe(
          tap((attendances) => {
            this.printTableService.generatePdf(handlerCallback(attendances, meetingName))
          }),
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
