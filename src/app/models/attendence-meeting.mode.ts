export class AttendenceMeeting {
  constructor(
    public id: number,
    public name: string,
    public date: Date,
    public isPresent: 'SI' | 'NO',
    public fine: number
  ) {}

  static fromJson({ id, name, date, fine_amount, isPresent }: any) {
    return new AttendenceMeeting(id, name, date, isPresent ? 'SI' : 'NO', fine_amount)
  }
}
