export class UserPartial {
  public static fromJson(json: any) {
    const { id, name, email } = json;
    return new UserPartial(id, name, email);
  }

  constructor(public id: number, public name: string, public email: string) {}
}
