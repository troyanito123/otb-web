import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PrivateComponent } from './private.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        data: { roles: ['USER', 'ADMIN', 'SUPERVISOR'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
        data: { roles: ['ADMIN'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'expenses',
        loadChildren: () =>
          import('../expenses/expenses.module').then((m) => m.ExpensesModule),
        data: { roles: ['ADMIN', 'SUPERVISOR'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'meetings',
        loadChildren: () =>
          import('../meetings/meetings.module').then((m) => m.MeetingsModule),
        data: { roles: ['ADMIN'] },
        canActivate: [AuthGuard],
      },

      {
        path: 'monthly-payments',
        loadChildren: () =>
          import('../monthly-payments/monthly-payments.module').then(
            (m) => m.MonthlyPaymentsModule
          ),
        data: { roles: ['ADMIN'] },
        canActivate: [AuthGuard],
      },

      {
        path: 'contributions',
        loadChildren: () =>
          import('../contributions/contributions.module').then(
            (m) => m.ContributionsModule
          ),
        data: { roles: ['ADMIN'] },
        canActivate: [AuthGuard],
      },

      {
        path: 'certifications',
        loadChildren: () =>
          import('../certifications/certifications.module').then(
            (m) => m.CertificationsModule
          ),
        data: { roles: ['ADMIN'] },
        canActivate: [AuthGuard],
      },

      {
        path: 'reports',
        loadChildren: () =>
          import('../reports/reports.module').then((m) => m.ReportsModule),
        data: { roles: ['ADMIN', 'SUPERVISOR'] },
        canActivate: [AuthGuard],
      },

      {
        path: 'extra-contributions',
        loadChildren: () =>
          import('../extra-contributions/extra-contributions.module').then(
            (m) => m.ExtraContributionsModule
          ),
        data: { roles: ['ADMIN', 'SUPERVISOR'] },
        canActivate: [AuthGuard],
      },
      {
        path: 'incomes',
        loadChildren: () =>
          import('../incomes/incomes.module').then((m) => m.IncomesModule),
        data: { roles: ['ADMIN', 'SUPERVISOR'] },
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
