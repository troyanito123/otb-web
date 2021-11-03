import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ContributionsActions from '../actions/contributions.action';
import { ContributionService } from 'src/app/services/contribution.service';

@Injectable()
export class ContributionsEffect {
  constructor(
    private actions$: Actions,
    private contributionService: ContributionService
  ) {}

  loadContributions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionsActions.loadContributions),
      mergeMap(() =>
        this.contributionService.getAll().pipe(
          map((contributions) =>
            ContributionsActions.loadContributionsSuccess({ contributions })
          ),
          catchError((e) =>
            of(ContributionsActions.loadContributionsError({ e }))
          )
        )
      )
    )
  );
}
