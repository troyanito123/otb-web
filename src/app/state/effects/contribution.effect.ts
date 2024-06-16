import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import { Actions, createEffect, ofType } from '@ngrx/effects'

import { ContributionActions } from '../actions/contribution.action'
import { ContributionService } from 'src/app/services/contribution.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class ContributionEffect {
  constructor(
    private actions$: Actions,
    private contributionService: ContributionService,
    private router: Router,
    private matSnakBar: MatSnackBar
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionActions.load),
      mergeMap(({ id }) =>
        this.contributionService.getOne(id).pipe(
          map((contribution) => ContributionActions.success({ contribution })),
          catchError((e) => of(ContributionActions.error({ e })))
        )
      )
    )
  )

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionActions.create),
      mergeMap(({ description, amount, forwardSupplier, messageSupplier }) =>
        this.contributionService.create(description, amount).pipe(
          tap((contribution) => {
            this.router.navigateByUrl(forwardSupplier(contribution.id))
            this.matSnakBar.open(messageSupplier(contribution.description), 'OK')
          }),
          map((contribution) => ContributionActions.success({ contribution })),
          catchError((e) => {
            this.matSnakBar.open('Ocurrio un error al crear, intente de nuevo')
            return of(ContributionActions.error({ e }))
          })
        )
      )
    )
  )

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionActions.update),
      mergeMap(({ id, description, amount, forwardSupplier, messageSupplier }) =>
        this.contributionService.update(id, description, amount).pipe(
          tap((contribution) => {
            this.router.navigateByUrl(forwardSupplier(contribution.id))
            this.matSnakBar.open(messageSupplier(contribution.description), 'OK')
          }),
          map((contribution) => ContributionActions.success({ contribution })),
          catchError((e) => {
            this.matSnakBar.open('Ocurrio un error a actualizar, intente de nuevo')
            return of(ContributionActions.error({ e }))
          })
        )
      )
    )
  )

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContributionActions.remove),
      mergeMap(({ id, forward, messageSupplier }) =>
        this.contributionService.remove(id).pipe(
          tap((contribution) => {
            this.router.navigateByUrl(forward)
            this.matSnakBar.open(messageSupplier(contribution.description), 'OK')
          }),
          map((contribution) => ContributionActions.success({ contribution })),
          catchError((e) => {
            this.matSnakBar.open('Ocurrio un error a eliminar, intente de nuevo')
            return of(ContributionActions.error({ e }))
          })
        )
      )
    )
  )
}
