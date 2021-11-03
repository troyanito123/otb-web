export class Contribution {
  public static fromJson(json: any) {
    const { id, description, amount } = json;
    return new Contribution(id, description, amount);
  }

  constructor(
    public id: number,
    public description: string,
    public amount: number
  ) {}
}
