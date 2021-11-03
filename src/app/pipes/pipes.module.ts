import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyPaymentsPipe } from './monthly-payments.pipe';
import { PreContributionsPipe } from './pre-contributions.pipe';

@NgModule({
  declarations: [MonthlyPaymentsPipe, PreContributionsPipe],
  imports: [CommonModule],
  exports: [MonthlyPaymentsPipe, PreContributionsPipe],
})
export class PipesModule {}
