export class Certification {
  public static fromJson(json: any) {
    const { id, description, amount, type, date, user } = json;
    return new Certification(
      id,
      description,
      amount,
      type,
      date,
      PartialUser.fromJson(user)
    );
  }

  constructor(
    public id: number,
    public description: string,
    public amount: number,
    public type: CertificationType,
    public date: Date,
    public user: PartialUser
  ) {}
}

export enum CertificationType {
  SIMPLE = 'SIMPLE',
  COMPLETE = 'COMPLETE',
}

class PartialUser {
  public static fromJson(json: any) {
    const { id, name, email } = json;
    return new PartialUser(id, name, email);
  }

  constructor(public id: number, public name: string, public email: string) {}
}
