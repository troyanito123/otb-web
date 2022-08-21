export class Expense {
  public static fromJson(json: any) {
    const { id, description, amount, date, from_user, to_user, code } = json;
    return new Expense(id, description, amount, date, from_user, to_user, code);
  }
  constructor(
    public id: number,
    public description: string,
    public amount: number,
    public date: Date,
    public from_user: string,
    public to_user: string,
    public code: number
  ) {}
}
