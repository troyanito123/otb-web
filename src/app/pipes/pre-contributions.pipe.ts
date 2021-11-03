import { Pipe, PipeTransform } from '@angular/core';
import { ContributionPaid } from '../models/contribution-paid.model';
import { Contribution } from '../models/contribution.model';
import { PreContribution } from '../models/pre-contributions';

@Pipe({
  name: 'preContributions',
})
export class PreContributionsPipe implements PipeTransform {
  transform(
    contributions: Contribution[],
    contributionsPaid: ContributionPaid[]
  ): PreContribution[] {
    const res: PreContribution[] = [];

    for (let i = 0; i < contributions.length; i++) {
      const c = contributions[i];
      const { id, description, amount } = c;

      const preContribution = new PreContribution(id, 0, amount, description);

      for (let j = 0; j < contributionsPaid.length; j++) {
        const cp = contributionsPaid[j];
        if (cp.contribution.id === c.id) {
          preContribution.amountPay = cp.amount;
          break;
        }
      }
      res.push(preContribution);
    }
    return res;
  }
}
