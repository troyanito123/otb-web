import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';

@NgModule({
  declarations: [DashboardComponent, SummaryComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule,
  ],
})
export class DashboardModule {}
