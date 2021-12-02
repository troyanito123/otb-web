import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportExpensesComponent } from './pages/report-expenses/report-expenses.component';
import { ReportAttendencesComponent } from './pages/report-attendences/report-attendences.component';

@NgModule({
  declarations: [ReportsComponent, ReportExpensesComponent, ReportAttendencesComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class ReportsModule {}
