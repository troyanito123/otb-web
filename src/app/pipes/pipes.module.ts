import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyPaymentsPipe } from './monthly-payments.pipe';

@NgModule({
  declarations: [MonthlyPaymentsPipe],
  imports: [CommonModule],
  exports: [MonthlyPaymentsPipe],
})
export class PipesModule {}
