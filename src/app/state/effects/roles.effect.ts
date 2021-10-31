import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { RoleService } from 'src/app/services/role.service';
import { loadRoles, loadSuccess, loadError } from '../actions/role.action';

@Injectable()
export class RolesEffect {
  constructor(private actions$: Actions, private roleService: RoleService) {}

  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRoles),
      mergeMap(() =>
        this.roleService.getAll().pipe(
          map((roles) => loadSuccess({ roles })),
          catchError((e) => of(loadError({ e })))
        )
      )
    )
  );
}
