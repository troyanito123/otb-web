import { Injectable } from '@angular/core'
import { mergeMap, map, catchError, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import { Actions, createEffect, ofType } from '@ngrx/effects'
import { UserService } from 'src/app/services/user.service'
import { UserActions } from '../actions/user.action'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(({ id }) =>
        this.userService.getOne(id).pipe(
          map((user) => UserActions.loadSuccess({ user })),
          catchError((e) => of(UserActions.setError({ e })))
        )
      )
    )
  )

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.create),
      mergeMap(({ name, block_number, address_number, forwadSupplier, messageSupplier }) =>
        this.userService.create(name, block_number, address_number).pipe(
          tap(({ id, name }) => {
            this.snackBar.open(messageSupplier(name), 'OK')
            this.router.navigateByUrl(forwadSupplier(id))
          })
        )
      ),
      map((user) => UserActions.modifySuccess({ user })),
      catchError((e) => of(UserActions.setError({ e })))
    )
  )

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.update),
      mergeMap(
        ({
          id,
          name,
          block_number,
          address_number,
          status,
          role,
          email,
          password,
          forwadSupplier,
          messageSupplier,
        }) =>
          this.userService
            .update(id, name, block_number, address_number, status, role, email, password)
            .pipe(
              tap(({ id, name }) => {
                this.snackBar.open(messageSupplier(name), 'OK')
                this.router.navigateByUrl(forwadSupplier(id))
              })
            )
      ),
      map((user) => UserActions.modifySuccess({ user })),
      catchError((e) => of(UserActions.setError({ e })))
    )
  )

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.remove),
      mergeMap(({ id, forward, messageSupplier }) =>
        this.userService.remove(id).pipe(
          tap(({ name }) => {
            this.router.navigateByUrl(forward)
            this.snackBar.open(messageSupplier(name), 'OK')
          })
        )
      ),
      map((user) => UserActions.modifySuccess({ user })),
      catchError((e) => of(UserActions.setError({ e })))
    )
  )
}
