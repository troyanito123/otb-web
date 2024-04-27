import { Injectable } from '@angular/core'

import { mergeMap, map, catchError, filter, first, switchMap, tap } from 'rxjs/operators'
import { of } from 'rxjs'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { CertificationActions } from '../actions/certification.action'
import * as CertificationsActions from '../actions/certifications.action'

import { CertificationService } from 'src/app/services/certification.service'
import { Store } from '@ngrx/store'
import { userFeature } from '@state/reducers/user.reducer'
import { Router } from '@angular/router'
import { addTransaction } from '@state/actions/transactions.action'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class CertificationEffect {
  constructor(
    private actions$: Actions,
    private certificationService: CertificationService,
    private store: Store,
    private router: Router,
    private matSnackBar: MatSnackBar,
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificationActions.create),
      mergeMap(({ description, amount, ctype, date, forwardSupplier, transactionsCallback }) =>
        this.store.select(userFeature.selectUser).pipe(
          filter((user) => user !== null),
          first(),
          switchMap((user) =>
            this.certificationService.create(description, amount, ctype, date, user!.id).pipe(
              tap((certification) => {
                this.store.dispatch(
                  addTransaction({ transactions: [transactionsCallback(certification)] })
                )
              }),
              map((certification) => CertificationActions.loadOrSaveSuccess({ certification })),
              tap(() => {
                this.router.navigateByUrl(forwardSupplier(user!.id))
              }),
              catchError((e) => of(CertificationActions.error({ e })))
            )
          )
        )
      )
    )
  )

  updated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificationActions.update),
      mergeMap(({ id, description, amount, ctype, date, forwardSupplier, messageSupplier }) =>
        this.certificationService.updated(id, description, amount, ctype, date).pipe(
          tap(certification => {
            this.router.navigateByUrl(forwardSupplier(certification.id))
            this.matSnackBar.open(messageSupplier(certification), 'Ok')
          }),
          map((certification) => CertificationActions.loadOrSaveSuccess({ certification })),
          catchError((e) => of(CertificationActions.error({ e })))
        )
      )
    )
  )

  removed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificationActions.remove),
      mergeMap(({ id, forwardSupplier, messageSupplier }) =>
        this.certificationService.remove(id).pipe(
          tap((certification) => {
            this.router.navigateByUrl(forwardSupplier())
            this.matSnackBar.open(messageSupplier(certification), 'Ok')
          }),
          map((certification) => CertificationActions.loadOrSaveSuccess({ certification })),
          catchError((e) => of(CertificationActions.error({ e })))
        )
      )
    )
  )

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificationsActions.load),
      mergeMap(() =>
        this.certificationService.getAll().pipe(
          map(({ certifications }) => CertificationsActions.loadSuccess({ certifications })),
          catchError((e) => of(CertificationsActions.error({ e })))
        )
      )
    )
  )

  getOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificationActions.load),
      mergeMap(({ id }) =>
        this.certificationService.getOne(id).pipe(
          map((certification) => CertificationActions.loadOrSaveSuccess({ certification })),
          catchError((e) => of(CertificationActions.error({ e })))
        )
      )
    )
  )

  getByDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CertificationsActions.loadByDate),
      mergeMap(({ initDate, endDate }) =>
        this.certificationService.getByDate(initDate, endDate).pipe(
          map((certifications) => CertificationsActions.loadSuccess({ certifications })),
          catchError((e) => of(CertificationsActions.error({ e })))
        )
      )
    )
  )
}
