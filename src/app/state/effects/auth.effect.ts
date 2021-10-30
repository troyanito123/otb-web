import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  renew,
  setError,
  setUser,
  signin,
  signout,
  unsetUser,
} from '../actions/auth.action';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthEffect {
  constructor(private actions$: Actions, private authService: AuthService) {}

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signin),
      mergeMap(({ email, password }) =>
        this.authService.signin(email, password).pipe(
          map(({ user, access_token }) => setUser({ user, access_token })),
          catchError((e) => of(setError({ e })))
        )
      )
    )
  );

  signout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signout),
      mergeMap(() => this.authService.signout().pipe(map(() => unsetUser())))
    )
  );

  renew$ = createEffect(() =>
    this.actions$.pipe(
      ofType(renew),
      mergeMap(() =>
        this.authService.renew().pipe(
          map(({ user, access_token }) => setUser({ user, access_token })),
          catchError((e) => of(unsetUser()))
        )
      )
    )
  );
}
