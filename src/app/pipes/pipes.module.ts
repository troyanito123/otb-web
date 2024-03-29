import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyPaymentsPipe } from './monthly-payments.pipe';
import { PreContributionsPipe } from './pre-contributions.pipe';
import { TransactionsToTotalPipe } from './transactions-to-total.pipe';
import { ToAttendencePipe } from './to-attendence.pipe';
import { PreFinesPaidPipe } from './pre-fines-paid.pipe';
import { ToSpanishPipe } from './to-spanish.pipe';
import { CouldPayFinePipe } from './could-pay-fine.pipe';

@NgModule({
  declarations: [
    MonthlyPaymentsPipe,
    PreContributionsPipe,
    TransactionsToTotalPipe,
    ToAttendencePipe,
    PreFinesPaidPipe,
    ToSpanishPipe,
    CouldPayFinePipe,
  ],
  imports: [CommonModule],
  exports: [
    MonthlyPaymentsPipe,
    PreContributionsPipe,
    TransactionsToTotalPipe,
    ToAttendencePipe,
    PreFinesPaidPipe,
    ToSpanishPipe,
    CouldPayFinePipe
  ],
})
export class PipesModule {}
