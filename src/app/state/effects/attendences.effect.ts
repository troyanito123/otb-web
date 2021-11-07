import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AttendencesActions from '../actions/attendences.actions';
import { AttendenceService } from 'src/app/services/attendence.service';

@Injectable()
export class AttendencesEffect {
  constructor(
    private actions$: Actions,
    private attendencesService: AttendenceService
  ) {}

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
  );
}
