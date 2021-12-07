import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FinesActions from '../actions/fines.actions';

import { FineService } from 'src/app/services/fine.service';

@Injectable()
export class FinesEffect {
  constructor(private actions$: Actions, private fineService: FineService) {}

  loadByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinesActions.loadByUser),
      mergeMap(({ id }) =>
        this.fineService.getByUser(id).pipe(
          map((fines) => FinesActions.loadSuccess({ fines })),
          catchError((e) => of(FinesActions.error({ e })))
        )
      )
    )
  );

  loadByDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinesActions.loadByDate),
      mergeMap(({ initDate, endDate }) =>
        this.fineService.getByDate(initDate, endDate).pipe(
          map((fines) => FinesActions.loadSuccess({ fines })),
          catchError((e) => of(FinesActions.error({ e })))
        )
      )
    )
  );

  createMany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinesActions.createMany),
      mergeMap(({ userId, date, meetingIds }) =>
        this.fineService.createMany(userId, date, meetingIds).pipe(
          map((fines) => FinesActions.createManySuccess({ fines })),
          catchError((e) => of(FinesActions.error({ e })))
        )
      )
    )
  );
}
