import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ExpensesComponent } from './expenses.component';
import { ExpensesDetailComponent } from './pages/expenses-detail/expenses-detail.component';
import { ExpensesEditComponent } from './pages/expenses-edit/expenses-edit.component';
import { ExpensesListComponent } from './pages/expenses-list/expenses-list.component';
import { ExpensesNewComponent } from './pages/expenses-new/expenses-new.component';
import { ExpensesReceiptComponent } from './pages/expenses-receipt/expenses-receipt.component';
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
        path: ':id',
        component: ExpensesViewComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] },
        children: [
          { path: 'detail', component: ExpensesDetailComponent },
          { path: 'edit', component: ExpensesEditComponent },
          { path: 'receipt', component: ExpensesReceiptComponent },
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
export class ExpensesRoutingModule {}
