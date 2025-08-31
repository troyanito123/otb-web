export class Meeting {
  public static fromJson(json: any) {
    const { id, name, description, date, fine_amount, conclutions, year, type } = json;
    return new Meeting(id, name, description, date, fine_amount, conclutions, year, type);
  }

  constructor(
    public id: number,
    public name: string,
    public description: string,
    public date: Date,
    public fine_amount: number,
    public conclutions: string | null,
    public year: string | null,
    public type: MeetingType | null,
  ) {}
}

export type MeetingData = {
  name: string,
  date: Date,
  description: string,
  fine_amount: number,
  conclutions?: string,
  year?: string,
  type?: MeetingType,
}

export enum MeetingType {
  GENERAL = 'GENERAL',
  EXTRAORDINARY = 'EXTRAORDINARY',
  MEETING = 'MEETING',
  PARADE = 'PARADE',
  PROTEST = 'PROTEST',
}

