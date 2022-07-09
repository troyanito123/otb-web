import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyPaymentsComponent } from './monthly-payments.component';
import { MonthlyPaymentsDetailComponent } from './pages/monthly-payments-detail/monthly-payments-detail.component';
import { MonthlyPaymentsEditComponent } from './pages/monthly-payments-edit/monthly-payments-edit.component';
import { MonthlyPaymentsListComponent } from './pages/monthly-payments-list/monthly-payments-list.component';
import { MonthlyPaymentsNewComponent } from './pages/monthly-payments-new/monthly-payments-new.component';
import { MonthlyPaymentsViewComponent } from './pages/monthly-payments-view/monthly-payments-view.component';

const routes: Routes = [
  {
    path: '',
    component: MonthlyPaymentsComponent,
    children: [
      { path: 'list', component: MonthlyPaymentsListComponent },
      { path: 'new', component: MonthlyPaymentsNewComponent },
      {
        path: ':id',
        component: MonthlyPaymentsViewComponent,
        children: [
          { path: 'detail', component: MonthlyPaymentsDetailComponent },
          { path: 'edit', component: MonthlyPaymentsEditComponent },
          { path: '', redirectTo: 'detail', pathMatch: 'full' },
        ],
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyPaymentsRoutingModule {}
