import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user.service';
import {
  create,
  createError,
  createSuccess,
  load,
  loadError,
  loadSuccess,
} from '../actions/users.action';

@Injectable()
export class UsersEffect {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      mergeMap(() =>
        this.userService.getAll().pipe(
          map((users) => loadSuccess({ users })),
          catchError((e) => of(loadError({ e })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(create),
      mergeMap(
        ({
          name,
          email,
          password,
          identification_number,
          block_number,
          address_number,
        }) =>
          this.userService
            .create(
              name,
              email,
              password,
              identification_number,
              block_number,
              address_number
            )
            .pipe(
              map((user) => createSuccess({ user })),
              catchError((e) => of(createError({ e })))
            )
      )
    )
  );
}
