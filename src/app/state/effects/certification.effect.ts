import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CertificationActions from '../actions/certification.action';
import * as CertificationsActions from '../actions/certifications.action';

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

  updated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificationActions.update),
      mergeMap(({ id, description, amount, ctype, date }) =>
        this.certificationService
          .updated(id, description, amount, ctype, date)
          .pipe(
            map((certification) =>
              CertificationActions.updateSuccess({ certification })
            ),
            catchError((e) => of(CertificationActions.error({ e })))
          )
      )
    )
  );

  removed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificationActions.remove),
      mergeMap(({ id }) =>
        this.certificationService.remove(id).pipe(
          map((certification) =>
            CertificationActions.removeSuccess({ certification })
          ),
          catchError((e) => of(CertificationActions.error({ e })))
        )
      )
    )
  );

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificationsActions.load),
      mergeMap(() =>
        this.certificationService.getAll().pipe(
          map(({ certifications }) =>
            CertificationsActions.loadSuccess({ certifications })
          ),
          catchError((e) => of(CertificationsActions.error({ e })))
        )
      )
    )
  );

  getOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificationActions.load),
      mergeMap(({ id }) =>
        this.certificationService.getOne(id).pipe(
          map((certification) =>
            CertificationActions.loadSuccess({ certification })
          ),
          catchError((e) => of(CertificationActions.error({ e })))
        )
      )
    )
  );
}
