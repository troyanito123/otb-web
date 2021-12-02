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
    path: 'expenses',
    loadChildren: () =>
      import('./modules/expenses/expenses.module').then(
        (m) => m.ExpensesModule
      ),
    data: { roles: ['ADMIN'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'meetings',
    loadChildren: () =>
      import('./modules/meetings/meetings.module').then(
        (m) => m.MeetingsModule
      ),
    data: { roles: ['ADMIN'] },
    canActivate: [AuthGuard],
  },

  {
    path: 'monthly-payments',
    loadChildren: () =>
      import('./modules/monthly-payments/monthly-payments.module').then(
        (m) => m.MonthlyPaymentsModule
      ),
    data: { roles: ['ADMIN'] },
    canActivate: [AuthGuard],
  },

  {
    path: 'contributions',
    loadChildren: () =>
      import('./modules/contributions/contributions.module').then(
        (m) => m.ContributionsModule
      ),
    data: { roles: ['ADMIN'] },
    canActivate: [AuthGuard],
  },

  {
    path: 'certifications',
    loadChildren: () =>
      import('./modules/certifications/certifications.module').then(
        (m) => m.CertificationsModule
      ),
    data: { roles: ['ADMIN'] },
    canActivate: [AuthGuard],
  },

  {
    path: 'reports',
    loadChildren: () =>
      import('./modules/reports/reports.module').then((m) => m.ReportsModule),
    data: { roles: ['ADMIN'] },
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
