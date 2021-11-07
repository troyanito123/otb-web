import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAttendencesComponent } from './pages/user-attendences/user-attendences.component';
import { UserCertificationsComponent } from './pages/user-certifications/user-certifications.component';
import { UserContributionComponent } from './pages/user-contribution/user-contribution.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserNewComponent } from './pages/user-new/user-new.component';
import { UserPaymentComponent } from './pages/user-payment/user-payment.component';
import { UserReceiptViewComponent } from './pages/user-receipt-view/user-receipt-view.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: 'list', component: UserListComponent },
      { path: 'new', component: UserNewComponent },
      {
        path: ':id',
        component: UserViewComponent,
        children: [
          { path: 'attendences', component: UserAttendencesComponent },
          { path: 'contributions', component: UserContributionComponent },
          { path: 'certifications', component: UserCertificationsComponent },
          { path: 'payment', component: UserPaymentComponent },
          { path: 'detail', component: UserDetailComponent },
          { path: 'edit', component: UserEditComponent },
          { path: 'receipt-view', component: UserReceiptViewComponent },
          { path: '', redirectTo: 'detail' },
        ],
      },

      { path: '', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
