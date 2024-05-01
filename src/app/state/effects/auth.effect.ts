import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { mergeMap, map, catchError, tap } from 'rxjs/operators'
import { of } from 'rxjs'
import { AuthActions } from '../actions/auth.action'
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'
import { DialogService } from 'src/app/utils/dialog.service'

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signin),
      mergeMap(({ email, password, forward }) =>
        this.authService.signin(email, password).pipe(
          map(({ user, access_token }) => AuthActions.setUser({ user, access_token })),
          tap(() => this.router.navigate([forward])),
          catchError((e) => {
            this.dialogService.open('Error', 'Credenciales incorrectas')
            return of(AuthActions.setError({ e }))
          })
        )
      )
    )
  )

  signout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signout),
      mergeMap(({ forward }) =>
        this.authService.signout().pipe(
          map(() => AuthActions.unsetUser()),
          tap(() => this.router.navigateByUrl(forward))
        )
      )
    )
  )

  renew$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.renew),
      mergeMap(({ forward }) =>
        this.authService.renew().pipe(
          map(({ user, access_token }) => AuthActions.setUser({ user, access_token })),
          tap(() => this.router.navigateByUrl(forward)),
          catchError((e) => of(AuthActions.unsetUser()))
        )
      )
    )
  )
}
