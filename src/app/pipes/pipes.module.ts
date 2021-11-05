import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyPaymentsPipe } from './monthly-payments.pipe';
import { PreContributionsPipe } from './pre-contributions.pipe';
import { TransactionsToTotalPipe } from './transactions-to-total.pipe';

@NgModule({
  declarations: [
    MonthlyPaymentsPipe,
    PreContributionsPipe,
    TransactionsToTotalPipe,
  ],
  imports: [CommonModule],
  exports: [MonthlyPaymentsPipe, PreContributionsPipe, TransactionsToTotalPipe],
})
export class PipesModule {}
