import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomesComponent } from './incomes.component';
import { IncomeDetailComponent } from './pages/income-detail/income-detail.component';
import { IncomeEditComponent } from './pages/income-edit/income-edit.component';
import { IncomeListComponent } from './pages/income-list/income-list.component';
import { IncomeNewComponent } from './pages/income-new/income-new.component';
import { IncomeViewComponent } from './pages/income-view/income-view.component';

const routes: Routes = [
  {
    path: '',
    component: IncomesComponent,
    children: [
      { path: 'list', component: IncomeListComponent },
      { path: 'new', component: IncomeNewComponent },
      {
        path: ':id',
        component: IncomeViewComponent,
        children: [
          { path: 'edit', component: IncomeEditComponent },
          { path: 'detail', component: IncomeDetailComponent },
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
export class IncomesRoutingModule {}
