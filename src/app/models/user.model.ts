export class User {
  static fromJson(json: any) {
    const {
      id,
      name,
      identification_number,
      email,
      address_number,
      block_number,
      status,
      role,
      subscription_at,
    } = json;

    return new User(
      id,
      name,
      identification_number,
      email,
      address_number,
      block_number,
      status,
      role,
      subscription_at,
    );
  }

  constructor(
    public id: number,
    public name: string,
    public identification_number: string,
    public email: string,
    public address_number: string,
    public block_number: string,
    public status: string,
    public role: RoleType,
    public subscription_at: string
  ) {}
}

export enum RoleType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
