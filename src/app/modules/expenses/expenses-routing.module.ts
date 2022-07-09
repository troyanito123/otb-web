import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ExpensesComponent } from './expenses.component';
import { ExpensesEditComponent } from './pages/expenses-edit/expenses-edit.component';
import { ExpensesListComponent } from './pages/expenses-list/expenses-list.component';
import { ExpensesNewComponent } from './pages/expenses-new/expenses-new.component';
import { ExpensesViewComponent } from './pages/expenses-view/expenses-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExpensesComponent,
    children: [
      { path: 'list', component: ExpensesListComponent },
      {
        path: 'new',
        component: ExpensesNewComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'edit/:id',
        component: ExpensesEditComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
      },
      { path: ':id', component: ExpensesViewComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesRoutingModule {}
