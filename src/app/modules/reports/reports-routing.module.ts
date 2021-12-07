import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportAttendencesComponent } from './pages/report-attendences/report-attendences.component';
import { ReportExpensesComponent } from './pages/report-expenses/report-expenses.component';
import { ReportIncomeComponent } from './pages/report-income/report-income.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      { path: 'attendences', component: ReportAttendencesComponent },
      { path: 'expenses', component: ReportExpensesComponent },
      { path: 'income', component: ReportIncomeComponent },
      { path: '', redirectTo: 'attendences' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
