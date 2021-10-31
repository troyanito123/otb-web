export class MonthlyPayment {
  public static fromJson(json: any) {
    const { id, month, year, amount } = json;
    return new MonthlyPayment(id, month, year, amount);
  }

  constructor(
    public id: number,
    public month: string,
    public year: string,
    public amount: number
  ) {}
}
