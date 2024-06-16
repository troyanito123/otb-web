export class PreFinesPaid {
  constructor(
    public meetingId: number,
    public meetingName: string,
    public meetingDate: Date,
    public attendence: 'SI' | 'NO',
    public fine: number,
    public finePaid: number
  ) {}

  static fromJson({ meetingId, meetingName, meetingDate, attendence, fine, finePaid }: any) {
    return new PreFinesPaid(meetingId, meetingName, meetingDate, attendence, fine, finePaid)
  }
}
