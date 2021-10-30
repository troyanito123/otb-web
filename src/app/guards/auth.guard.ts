import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const allowedRoles = route.data.roles as string[];

    return this.authService.renew().pipe(
      map(({ user }) => allowedRoles.includes(user.role)),
      catchError((e) => of(false)),
      tap((success) => {
        if (!success) this.router.navigate(['/auth']);
      })
    );
  }
}
