import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyPaymentsPipe } from './monthly-payments.pipe';
import { PreContributionsPipe } from './pre-contributions.pipe';
import { TransactionsToTotalPipe } from './transactions-to-total.pipe';
import { ToAttendencePipe } from './to-attendence.pipe';

@NgModule({
  declarations: [
    MonthlyPaymentsPipe,
    PreContributionsPipe,
    TransactionsToTotalPipe,
    ToAttendencePipe,
  ],
  imports: [CommonModule],
  exports: [
    MonthlyPaymentsPipe,
    PreContributionsPipe,
    TransactionsToTotalPipe,
    ToAttendencePipe,
  ],
})
export class PipesModule {}
