import { MonthlyPayment } from './monthly-payment.model';

export class MonthlyPaymentMade {
  public static fromJson(json: any) {
    const { id, amount, date, user, monthly_paymet } = json;
    const { id: userId, name, email } = user;
    const { id: mpId, month, year, amount: mpAmount } = monthly_paymet;
    return new MonthlyPaymentMade(
      id,
      amount,
      date,
      new UserPayment(userId, name, email),
      new MonthlyPayment(mpId, month, year, mpAmount)
    );
  }

  constructor(
    public id: number,
    public amount: number,
    public date: Date,
    public user: UserPayment,
    public monthlyPayment: MonthlyPayment
  ) {}
}

class UserPayment {
  constructor(public id: number, public name: string, public email: string) {}
}
