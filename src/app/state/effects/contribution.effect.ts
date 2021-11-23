import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ContributionActions from '../actions/contribution.action';
import { ContributionService } from 'src/app/services/contribution.service';

@Injectable()
export class ContributionEffect {
  constructor(
    private actions$: Actions,
    private contributionService: ContributionService
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionActions.load),
      mergeMap(({ id }) =>
        this.contributionService.getOne(id).pipe(
          map((contribution) =>
            ContributionActions.loadSuccess({ contribution })
          ),
          catchError((e) => of(ContributionActions.error({ e })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionActions.create),
      mergeMap(({ description, amount }) =>
        this.contributionService.create(description, amount).pipe(
          map((contribution) =>
            ContributionActions.createSuccess({ contribution })
          ),
          catchError((e) => of(ContributionActions.error({ e })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionActions.update),
      mergeMap(({ id, description, amount }) =>
        this.contributionService.update(id, description, amount).pipe(
          map((contribution) =>
            ContributionActions.updateSuccess({ contribution })
          ),
          catchError((e) => of(ContributionActions.error({ e })))
        )
      )
    )
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionActions.remove),
      mergeMap(({ id }) =>
        this.contributionService.remove(id).pipe(
          map((contribution) =>
            ContributionActions.removeSuccess({ contribution })
          ),
          catchError((e) => of(ContributionActions.error({ e })))
        )
      )
    )
  );
}
