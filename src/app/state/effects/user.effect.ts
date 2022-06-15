import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user.service';
import {
  loadUser,
  loadError,
  loadSuccess,
  create,
  saveSuccess,
  saveError,
  update,
  remove,
  removeSuccess,
} from '../actions/user.action';

@Injectable()
export class UserEffect {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      mergeMap(({ id }) =>
        this.userService.getOne(id).pipe(
          map((user) => loadSuccess({ user })),
          catchError((e) => of(loadError({ e })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(create),
      mergeMap(({ name, block_number, address_number }) =>
        this.userService.create(name, block_number, address_number).pipe(
          map((user) => saveSuccess({ user })),
          catchError((e) => of(saveError({ e })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(update),
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
        }) =>
          this.userService
            .update(
              id,
              name,
              block_number,
              address_number,
              status,
              role,
              email,
              password
            )
            .pipe(
              map((user) => saveSuccess({ user })),
              catchError((e) => of(saveError({ e })))
            )
      )
    )
  );

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(remove),
      mergeMap(({ id }) =>
        this.userService.remove(id).pipe(
          map((user) => removeSuccess({ user })),
          catchError((e) => of(saveError({ e })))
        )
      )
    )
  );
}
