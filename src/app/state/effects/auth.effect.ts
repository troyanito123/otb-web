import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { mergeMap, map, catchError, tap } from 'rxjs/operators'
import { of } from 'rxjs'
import { renew, setError, setUser, signin, signout, unsetUser } from '../actions/auth.action'
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
      ofType(signin),
      mergeMap(({ email, password }) =>
        this.authService.signin(email, password).pipe(
          map(({ user, access_token }) => setUser({ user, access_token })),
          tap(() => this.router.navigate(['/private/dashboard'])),
          catchError((e) => {
            this.dialogService.open('Error al iniciar sesión', 'Por favor revisa tus credenciales.')
            return of(setError({ e }))
          })
        )
      )
    )
  )

  signout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signout),
      mergeMap(() =>
        this.authService.signout().pipe(
          map(() => unsetUser()),
          tap(() => this.router.navigate(['/public']))
        )
      )
    )
  )

  renew$ = createEffect(() =>
    this.actions$.pipe(
      ofType(renew),
      mergeMap(() =>
        this.authService.renew().pipe(
          map(({ user, access_token }) => setUser({ user, access_token })),
          tap(() => this.router.navigate(['/private/dashboard'])),
          catchError((e) => of(unsetUser()))
        )
      )
    )
  )
}
