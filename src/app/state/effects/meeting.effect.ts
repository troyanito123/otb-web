import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as MeetingActions from '../actions/meeting.actions';
import { MeetingService } from 'src/app/services/meeting.service';

@Injectable()
export class MeetingEffect {
  constructor(
    private actions$: Actions,
    private meetingService: MeetingService
  ) {}

  loadMeeting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingActions.load),
      mergeMap(({ id }) =>
        this.meetingService.getOne(id).pipe(
          map((meeting) => MeetingActions.loadSucces({ meeting })),
          catchError((e) => of(MeetingActions.error({ e })))
        )
      )
    )
  );

  created$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingActions.create),
      mergeMap(({ name, description, date, conclutions, fine_amount }) =>
        this.meetingService
          .create(name, description, date, fine_amount, conclutions)
          .pipe(
            map((meeting) => MeetingActions.createSuccess({ meeting })),
            catchError((e) => of(MeetingActions.error({ e })))
          )
      )
    )
  );

  updated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingActions.update),
      mergeMap(({ id, name, description, date, conclutions, fine_amount }) =>
        this.meetingService
          .update(id, name, description, date, fine_amount, conclutions)
          .pipe(
            map((meeting) => MeetingActions.updateSuccess({ meeting })),
            catchError((e) => of(MeetingActions.error({ e })))
          )
      )
    )
  );

  removed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingActions.remove),
      mergeMap(({ id }) =>
        this.meetingService.remove(id).pipe(
          map((meeting) => MeetingActions.removeSuccess({ meeting })),
          catchError((e) => of(MeetingActions.error({ e })))
        )
      )
    )
  );
}
