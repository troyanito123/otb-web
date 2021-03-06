import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as ContributionsPaidActions from '../actions/contributions-paid.action';
import { ContributionPaidService } from 'src/app/services/contribution-paid.service';

@Injectable()
export class ContributionsPaidEffect {
  constructor(
    private actions$: Actions,
    private contributionPaidService: ContributionPaidService
  ) {}

  loadContributionsPaid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionsPaidActions.loadContributionsPaid),
      mergeMap(({ userId }) =>
        this.contributionPaidService.getByUser(userId).pipe(
          map((contributionsPaid) =>
            ContributionsPaidActions.loadContributionsPaidSuccess({
              contributionsPaid,
            })
          ),
          catchError((e) =>
            of(ContributionsPaidActions.loadContributionsPaidError({ e }))
          )
        )
      )
    )
  );

  loadContributionsPaidByDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionsPaidActions.loadContributionsPaidByDate),
      mergeMap(({ initDate, endDate }) =>
        this.contributionPaidService.getByDate(initDate, endDate).pipe(
          map((contributionsPaid) =>
            ContributionsPaidActions.loadContributionsPaidSuccess({
              contributionsPaid,
            })
          ),
          catchError((e) =>
            of(ContributionsPaidActions.loadContributionsPaidError({ e }))
          )
        )
      )
    )
  );

  createContributionsPaid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionsPaidActions.createContributionsPaid),
      mergeMap(({ amount, userId, contributionId }) =>
        this.contributionPaidService
          .create(amount, userId, contributionId)
          .pipe(
            map((contributionPaid) =>
              ContributionsPaidActions.addContributionsPaid({
                contributionPaid,
              })
            ),
            catchError((e) =>
              of(ContributionsPaidActions.loadContributionsPaidError({ e }))
            )
          )
      )
    )
  );

  createManyContributionsPaid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionsPaidActions.createManyContributionsPaid),
      mergeMap(({ userId, contributionsId, date }) =>
        this.contributionPaidService
          .crateMany(userId, contributionsId, date)
          .pipe(
            map((contributionsPaid) =>
              ContributionsPaidActions.addManyContributionsPaid({
                contributionsPaid,
              })
            ),
            catchError((e) =>
              of(ContributionsPaidActions.loadContributionsPaidError({ e }))
            )
          )
      )
    )
  );
}
