import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';

import { ExpensesComponent } from './expenses.component';
import { ExpensesListComponent } from './pages/expenses-list/expenses-list.component';
import { ExpensesNewComponent } from './pages/expenses-new/expenses-new.component';
import { ExpensesEditComponent } from './pages/expenses-edit/expenses-edit.component';
import { ExpensesViewComponent } from './pages/expenses-view/expenses-view.component';
import { ExpensesFormComponent } from './components/expenses-form/expenses-form.component';
import { ExpensesSingleComponent } from './components/expenses-single/expenses-single.component';
import { ExpensesReceiptComponent } from './pages/expenses-receipt/expenses-receipt.component';
import { ExpensesDetailComponent } from './pages/expenses-detail/expenses-detail.component';

@NgModule({
  declarations: [
    ExpensesComponent,
    ExpensesListComponent,
    ExpensesNewComponent,
    ExpensesEditComponent,
    ExpensesViewComponent,
    ExpensesFormComponent,
    ExpensesSingleComponent,
    ExpensesReceiptComponent,
    ExpensesDetailComponent,
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
})
export class ExpensesModule {}
