import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user.service';
import * as UsersActions from '../actions/users.action';

@Injectable()
export class UsersEffect {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsersByBlock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadByBlock),
      mergeMap(({ block }) =>
        this.userService.findByBlock(block).pipe(
          map((users) => UsersActions.loadSuccess({ users })),
          catchError((e) => of(UsersActions.loadError({ e })))
        )
      )
    )
  );
}
