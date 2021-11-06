import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CertificationActions from '../actions/certification.action';

import { CertificationService } from 'src/app/services/certification.service';

@Injectable()
export class CertificationEffect {
  constructor(
    private actions$: Actions,
    private certificationService: CertificationService
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificationActions.create),
      mergeMap(({ description, amount, ctype, date, userId }) =>
        this.certificationService
          .create(description, amount, ctype, date, userId)
          .pipe(
            map((certification) =>
              CertificationActions.createSuccess({ certification })
            ),
            catchError((e) => of(CertificationActions.error({ e })))
          )
      )
    )
  );
}
