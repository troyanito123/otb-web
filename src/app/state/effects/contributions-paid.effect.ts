import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, first, switchMap, filter, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import { Actions, createEffect, ofType } from '@ngrx/effects'

import { ContributionsPaidActions } from '../actions/contributions-paid.action'
import { ContributionPaidService } from 'src/app/services/contribution-paid.service'
import { Store } from '@ngrx/store'
import { userFeature } from '@state/reducers/user.reducer'
import { addTransaction } from '@state/actions/transactions.action'
import { Router } from '@angular/router'
import { PreContributionsActions } from '@state/actions/pre-constribution.action'

@Injectable()
export class ContributionsPaidEffect {
  constructor(
    private actions$: Actions,
    private contributionPaidService: ContributionPaidService,
    private store: Store,
    private router: Router
  ) {}

  loadContributionsPaid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionsPaidActions.loadContributionsPaid),
      mergeMap(() =>
        this.store.select(userFeature.selectUser).pipe(
          filter((user) => user !== null),
          first(),
          switchMap((user) =>
            this.contributionPaidService.getByUser(user!.id).pipe(
              map((contributionsPaid) =>
                ContributionsPaidActions.loadContributionsPaidSuccess({
                  contributionsPaid,
                })
              ),
              catchError((e) => of(ContributionsPaidActions.loadContributionsPaidError({ e })))
            )
          )
        )
      )
    )
  )

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
          catchError((e) => of(ContributionsPaidActions.loadContributionsPaidError({ e })))
        )
      )
    )
  )

  createContributionsPaid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionsPaidActions.createContributionsPaid),
      mergeMap(({ amount, userId, contributionId }) =>
        this.contributionPaidService.create(amount, userId, contributionId).pipe(
          map((contributionPaid) =>
            ContributionsPaidActions.addContributionsPaid({
              contributionPaid,
            })
          ),
          catchError((e) => of(ContributionsPaidActions.loadContributionsPaidError({ e })))
        )
      )
    )
  )

  createManyContributionsPaid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionsPaidActions.createManyContributionsPaid),
      mergeMap(({ contributionsId, date, forwadSupplier, generateTransactionsCallback }) =>
        this.store.select(userFeature.selectUser).pipe(
          filter((user) => user !== null),
          first(),
          switchMap((user) =>
            this.contributionPaidService.crateMany(user!.id, contributionsId, date)
          ),
          map((contributionsPaid) =>
            ContributionsPaidActions.addManyContributionsPaid({
              contributionsPaid,
              generateTransactionsCallback,
              forward: forwadSupplier(contributionsPaid[0].user.id),
            })
          ),
          catchError((e) => of(ContributionsPaidActions.loadContributionsPaidError({ e })))
        )
      )
    )
  )

  addManyContributionsPaid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionsPaidActions.addManyContributionsPaid),
      mergeMap(({ contributionsPaid, forward, generateTransactionsCallback }) =>
        of(addTransaction({ transactions: generateTransactionsCallback(contributionsPaid) })).pipe(
          tap(() => {
            this.router.navigateByUrl(forward)
            this.store.dispatch(PreContributionsActions.clean())
          })
        )
      )
    )
  )
}
