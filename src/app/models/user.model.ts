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
    } = json;

    return new User(
      id,
      name,
      identification_number,
      email,
      address_number,
      block_number,
      status,
      role
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
    public role: RoleType
  ) {}
}

export enum RoleType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
