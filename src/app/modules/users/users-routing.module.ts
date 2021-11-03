import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserReceiptComponent } from './components/user-receipt/user-receipt.component';
import { UserContributionComponent } from './pages/user-contribution/user-contribution.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserNewComponent } from './pages/user-new/user-new.component';
import { UserPaymentComponent } from './pages/user-payment/user-payment.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: 'list', component: UserListComponent },
      { path: 'new', component: UserNewComponent },
      { path: 'receipt', component: UserReceiptComponent },
      { path: 'contributions/:id', component: UserContributionComponent },
      { path: ':id', component: UserViewComponent },
      { path: 'edit/:id', component: UserEditComponent },
      { path: 'payment/:id', component: UserPaymentComponent },
      { path: '', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
