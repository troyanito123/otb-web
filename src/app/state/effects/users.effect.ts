import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user.service';
import { load, loadError, loadSuccess } from '../actions/users.action';

@Injectable()
export class UsersEffect {
  constructor(private actions$: Actions, private userService: UserService) {}

  // loadUsers$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(load),
  //     mergeMap(() =>
  //       this.userService.getAll().pipe(
  //         map((users) => loadSuccess({ users })),
  //         catchError((e) => of(loadError({ e })))
  //       )
  //     )
  //   )
  // );
}
