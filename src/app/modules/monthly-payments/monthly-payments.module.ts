import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthlyPaymentsRoutingModule } from './monthly-payments-routing.module';
import { MonthlyPaymentsComponent } from './monthly-payments.component';
import { MonthlyPaymentsListComponent } from './pages/monthly-payments-list/monthly-payments-list.component';
import { MonthlyPaymentsNewComponent } from './pages/monthly-payments-new/monthly-payments-new.component';
import { MonthlyPaymentsViewComponent } from './pages/monthly-payments-view/monthly-payments-view.component';
import { MonthlyPaymentsEditComponent } from './pages/monthly-payments-edit/monthly-payments-edit.component';
import { MonthlyPaymentsDetailComponent } from './pages/monthly-payments-detail/monthly-payments-detail.component';
import { MonthlyPaymentsFormComponent } from './components/monthly-payments-form/monthly-payments-form.component';
import { MonthlyPaymentsSingleComponent } from './components/monthly-payments-single/monthly-payments-single.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MonthlyPaymentsComponent,
    MonthlyPaymentsListComponent,
    MonthlyPaymentsNewComponent,
    MonthlyPaymentsViewComponent,
    MonthlyPaymentsEditComponent,
    MonthlyPaymentsDetailComponent,
    MonthlyPaymentsFormComponent,
    MonthlyPaymentsSingleComponent,
  ],
  imports: [
    CommonModule,
    MonthlyPaymentsRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class MonthlyPaymentsModule {}
