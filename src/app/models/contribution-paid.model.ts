import { Contribution } from './contribution.model';

export class ContributionPaid {
  public static fromJson(json: any) {
    const { id, amount, user, contribution } = json;
    return new ContributionPaid(
      id,
      amount,
      UserPaid.fromJson(user),
      Contribution.fromJson(contribution)
    );
  }

  constructor(
    public id: number,
    public amount: number,
    public user: UserPaid,
    public contribution: Contribution
  ) {}
}

class UserPaid {
  public static fromJson(json: any) {
    const { id, name, email } = json;
    return new UserPaid(id, name, email);
  }
  constructor(public id: number, public name: string, public email: string) {}
}
