export class Meeting {
  public static fromJson(json: any) {
    const { id, name, description, date, fine_amount, conclutions } = json;
    return new Meeting(id, name, description, date, fine_amount, conclutions);
  }

  constructor(
    public id: number,
    public name: string,
    public description: string,
    public date: Date,
    public fine_amount: number,
    public conclutions: string | null
  ) {}
}

export type MeetingData = {
  name: string,
  date: Date,
  description: string,
  fine_amount: number,
  conclutions?: string,
}
