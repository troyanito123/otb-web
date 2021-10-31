export class Role {
  public static fromJson(json: any) {
    const { id, name, code, description } = json;
    return new Role(id, name, code, description);
  }
  constructor(
    public id: number,
    public name: string,
    public code: string,
    public description: string
  ) {}
}
