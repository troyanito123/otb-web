import { Meeting } from './meeting.model';
import { UserPartial } from './user-partial.model';

export class Attendence {
  public static fromJson(json: any) {
    const { id, user, meeting } = json;
    return new Attendence(
      id,
      UserPartial.fromJson(user),
      Meeting.fromJson(meeting)
    );
  }

  constructor(
    public id: number,
    public user: UserPartial,
    public meeting: Meeting
  ) {}
}
