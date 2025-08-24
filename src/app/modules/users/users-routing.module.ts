import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserAllBlocksComponent } from './pages/user-all-blocks/user-all-blocks.component'
import { UserAttendencesComponent } from './pages/user-attendences/user-attendences.component'
import { UserBlockComponent } from './pages/user-block/user-block.component'
import { UserCertificationsComponent } from './pages/user-certifications/user-certifications.component'
import { UserContributionComponent } from './pages/user-contribution/user-contribution.component'
import { UserDetailComponent } from './pages/user-detail/user-detail.component'
import { UserEditComponent } from './pages/user-edit/user-edit.component'
import { UserExtraContributionComponent } from './pages/user-extra-contribution/user-extra-contribution.component'
import { UserFinesComponent } from './pages/user-fines/user-fines.component'
import { UserIncomesCreateComponent } from './pages/user-incomes/user-incomes-create/user-incomes-create.component'
import { UserIncomesListComponent } from './pages/user-incomes/user-incomes-list/user-incomes-list.component'
import { UserIncomesComponent } from './pages/user-incomes/user-incomes.component'
import { UserListComponent } from './pages/user-list/user-list.component'
import { UserNewComponent } from './pages/user-new/user-new.component'
import { UserPaymentComponent } from './pages/user-payment/user-payment.component'
import { UserReceiptViewComponent } from './pages/user-receipt-view/user-receipt-view.component'
import { UserViewComponent } from './pages/user-view/user-view.component'
import { UsersComponent } from './users.component'
import { UserIncomesEditComponent } from './pages/user-incomes/user-incomes-edit/user-incomes-edit.component'
import { UserReportComponent } from './pages/user-report/user-report.component'

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: 'list', component: UserListComponent, data: { mustBeStored: true } },
      { path: 'new', component: UserNewComponent },
      {
        path: 'blocks',
        component: UserAllBlocksComponent,
        children: [{ path: ':block', component: UserBlockComponent }],
      },

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
          { path: 'fines', component: UserFinesComponent },
          {
            path: 'incomes',
            component: UserIncomesComponent,
            children: [
              { path: 'list', component: UserIncomesListComponent },
              { path: 'new', component: UserIncomesCreateComponent },
              { path: ':id', component: UserIncomesEditComponent },
              { path: '', redirectTo: 'list', pathMatch: 'full' },
            ],
          },
          { 
            path: 'extra-contributions',
            component: UserExtraContributionComponent,
          },
          { 
            path: 'report',
            component: UserReportComponent,
          },
          { path: '', redirectTo: 'detail', pathMatch: 'full' },
        ],
      },

      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
