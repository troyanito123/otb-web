import { MonthlyPayment } from './monthly-payment.model';

export class MonthlyPaymentMade {
  public static fromJson(json: any) {
    const { id, amount, user, monthly_payment } = json;
    const { id: userId, name, email } = user;
    const { id: mpId, month, year, amount: mpAmount } = monthly_payment;
    return new MonthlyPaymentMade(
      id,
      amount,
      new UserPayment(userId, name, email),
      new MonthlyPayment(mpId, month, year, mpAmount)
    );
  }

  constructor(
    public id: number,
    public amount: number,
    public user: UserPayment,
    public monthlyPayment: MonthlyPayment
  ) {}
}

class UserPayment {
  constructor(public id: number, public name: string, public email: string) {}
}
