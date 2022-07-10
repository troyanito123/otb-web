export class IncomeModel {
  public static fromJson({ id, amount, description, date, status, user }: any) {
    return new IncomeModel(
      id,
      amount,
      description,
      date,
      status,
      User.fromJson(user)
    );
  }

  constructor(
    public id: number,
    public amount: number,
    public description: string,
    public date: Date,
    public status: GenericStatus,
    public user: User
  ) {}
}

class User {
  public static fromJson({ id, name }: any) {
    return new User(id, name);
  }
  constructor(public id: number, public name: string) {}
}

export enum GenericStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}
