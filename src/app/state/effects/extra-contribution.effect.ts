import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ExtraContActions from '../actions/extra-contribution.action';
import { ExtraContributionService } from 'src/app/services/extra-contribution.service';

@Injectable()
export class ExtraContributionEffect {
  constructor(
    private actions$: Actions,
    private extraContService: ExtraContributionService
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExtraContActions.loadAll),
      mergeMap(() =>
        this.extraContService.getAll().pipe(
          map((extraContributions) =>
            ExtraContActions.loadAllSuccess({ data: extraContributions })
          ),
          catchError((e) => of(ExtraContActions.setError({ e })))
        )
      )
    )
  );

  loadByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExtraContActions.loadByUser),
      mergeMap(({ id }) =>
        this.extraContService.getByUser(id).pipe(
          map((data) => ExtraContActions.loadByUserSuccess({ data })),
          catchError((e) => of(ExtraContActions.setError({ e })))
        )
      )
    )
  );

  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExtraContActions.loadOne),
      mergeMap(({ id }) =>
        this.extraContService.getOne(id).pipe(
          map((extraContribution) =>
            ExtraContActions.loadOneSuccess({ data: extraContribution })
          ),
          catchError((e) => of(ExtraContActions.setError({ e })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExtraContActions.create),
      mergeMap(({ data }) =>
        this.extraContService.create(data).pipe(
          map((extraContribution) =>
            ExtraContActions.createSuccess({ data: extraContribution })
          ),
          catchError((e) => of(ExtraContActions.setError({ e })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExtraContActions.update),
      mergeMap(({ id, data }) =>
        this.extraContService.update(id, data).pipe(
          map((extraContribution) =>
            ExtraContActions.updateSuccess({ data: extraContribution })
          ),
          catchError((e) => of(ExtraContActions.setError({ e })))
        )
      )
    )
  );

  payment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExtraContActions.payment),
      mergeMap(({ userId, contributionId }) =>
        this.extraContService.payment(userId, contributionId).pipe(
          map((data) => ExtraContActions.paymentSuccess({ data })),
          catchError((e) => of(ExtraContActions.setError({ e })))
        )
      )
    )
  );
}
