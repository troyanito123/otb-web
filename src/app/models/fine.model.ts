import { UserPartial } from './user-partial.model';

export class Fine {
  public static fromJson(json: any) {
    const { id, fine_paid, date, user, meeting } = json;
    return new Fine(
      id,
      fine_paid,
      date,
      UserPartial.fromJson(user),
      MeetingPartial.fromJson(meeting)
    );
  }

  constructor(
    public id: number,
    public fine_paid: number,
    public date: Date,
    public user: UserPartial,
    public meeting: MeetingPartial
  ) {}
}

class MeetingPartial {
  public static fromJson(json: any) {
    const { id, name, fine_amount, date } = json;
    return new MeetingPartial(id, name, fine_amount, date);
  }
  constructor(
    public id: number,
    public name: string,
    public fine_amount: number,
    public date: Date
  ) {}
}
