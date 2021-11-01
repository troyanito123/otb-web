export class PrePayment {
  constructor(
    public id: number,
    public amountPay: number,
    public amountForPay: number,
    public month: string,
    public year: string
  ) {}
}
