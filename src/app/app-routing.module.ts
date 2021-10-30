import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    data: { roles: ['USER', 'ADMIN'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
    data: { roles: ['USER', 'ADMIN'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
