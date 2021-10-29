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

@Injectable()
export class AuthEffect {
  constructor(private actions$: Actions) {}

  // signin$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(signin),
  //     mergeMap(({ email, password }) =>
  //       this.authService.signin(email, password).pipe(
  //         map((user) => setUser({ user })),
  //         catchError((e) => of(setError({ e })))
  //       )
  //     )
  //   )
  // );

  // signout$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(signout),
  //     mergeMap(() => this.authService.signout().pipe(map(() => unsetUser())))
  //   )
  // );

  // renew$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(renew),
  //     mergeMap(() =>
  //       this.authService.renew().pipe(
  //         map((user) => setUser({ user })),
  //         catchError((e) => of(unsetUser()))
  //       )
  //     )
  //   )
  // );
}