import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as MeetingsActions from '../actions/meetings.actions';
import { MeetingService } from 'src/app/services/meeting.service';

@Injectable()
export class MeetingsEffect {
  constructor(
    private actions$: Actions,
    private meetingService: MeetingService
  ) {}

  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeetingsActions.load),
      mergeMap(() =>
        this.meetingService.getAll().pipe(
          map((meetings) => MeetingsActions.loadSucces({ meetings })),
          catchError((e) => of(MeetingsActions.error({ e })))
        )
      )
    )
  );
}
