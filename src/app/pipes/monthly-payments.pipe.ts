import { Pipe, PipeTransform } from '@angular/core';
import { MonthlyPaymentMade } from '../models/monthly-payment-made';
import { MonthlyPayment } from '../models/monthly-payment.model';
import { PrePayment } from '../models/pre-payment';
import { couldPay } from '../utils/helper';

@Pipe({
  name: 'monthlyPayments',
})
export class MonthlyPaymentsPipe implements PipeTransform {
  transform(
    payments: MonthlyPayment[],
    paymentsMade: MonthlyPaymentMade[],
    enrolledAt: string
  ): PrePayment[] {
    const res: PrePayment[] = [];

    for (let i = 0; i < payments.length; i++) {
      
      const p = payments[i];
      if(couldPay(p.year, p.month, enrolledAt)){
        const { id, year, month, amount } = p;

        const prePayment = new PrePayment(id, 0, amount, month, year);
  
        for (let j = 0; j < paymentsMade.length; j++) {
          const pm = paymentsMade[j];
          if (pm.monthlyPayment.month === month) {
            prePayment.amountPay = pm.amount;
            break;
          }
        }
        res.push(prePayment);
      }
      
    }
    return res;
  }
}
