export class PreFinesPaid {
  constructor(
    public meetingId: number,
    public meetingName: string,
    public meetingDate: Date,
    public attendence: 'SI' | 'NO',
    public fine: number,
    public finePaid: number
  ) {}
}
