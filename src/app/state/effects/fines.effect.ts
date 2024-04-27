import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, switchMap, filter, first, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import { Actions, createEffect, ofType } from '@ngrx/effects'
import { FinesActions } from '../actions/fines.actions'

import { FineService } from 'src/app/services/fine.service'
import { Store } from '@ngrx/store'
import { userFeature } from '@state/reducers/user.reducer'
import { Router } from '@angular/router'
import { addTransaction } from '@state/actions/transactions.action'
import { PreFinesActions } from '@state/actions/pre-fine.action'

@Injectable()
export class FinesEffect {
  constructor(
    private actions$: Actions,
    private fineService: FineService,
    private store: Store,
    private router: Router
  ) {}

  loadAllFinesByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinesActions.loadAllFinesByUser),
      switchMap(() =>
        this.store.select(userFeature.selectUser).pipe(
          filter((user) => user !== null),
          first()
        )
      ),
      switchMap((user) => this.fineService.loadAllFinesByUser(user!.id)),
      map((allUserPreFines) => FinesActions.loadAllFinesByUserSuccess({ allUserPreFines })),
      catchError((e) => of(FinesActions.error({ e })))
    )
  )


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
  )

  createMany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinesActions.createMany),
      switchMap(({ date, meetingIds, transactions, forwardSupplier }) =>
        this.store.select(userFeature.selectUser).pipe(
          filter((user) => user !== null),
          first(),
          switchMap((user) =>
            this.fineService.createMany(user!.id, date, meetingIds).pipe(
              map((fines) => FinesActions.createManySuccess({ fines })),
              switchMap(() => of(addTransaction({ transactions }))),
              tap(() => {
                this.router.navigateByUrl(forwardSupplier(user!.id))
              }),
              catchError((e) => of(FinesActions.error({ e })))
            )
          )
        )
      )
    )
  )
}
