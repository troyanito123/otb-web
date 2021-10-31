import { Pipe, PipeTransform } from '@angular/core';
import { MonthlyPaymentMade } from '../models/monthly-payment-made';
import { MonthlyPayment } from '../models/monthly-payment.model';

@Pipe({
  name: 'monthlyPayments',
})
export class MonthlyPaymentsPipe implements PipeTransform {
  transform(
    payments: MonthlyPayment[],
    paymentsMade: MonthlyPaymentMade[]
  ): any[] {
    let res = [];

    for (let i = 0; i < payments.length; i++) {
      const p = payments[i];
      const { id, year, month, amount } = p;
      let resTemp: any = {};
      resTemp.id = id;
      resTemp.year = year;
      resTemp.month = month;
      resTemp.amountForPay = amount;
      resTemp.amountPay = 0;
      for (let j = 0; j < paymentsMade.length; j++) {
        const pm = paymentsMade[j];
        if (pm.monthlyPayment.month === month) {
          resTemp.amountPay = pm.amount;
          break;
        }
      }
      res.push(resTemp);
    }
    return res;
  }
}
