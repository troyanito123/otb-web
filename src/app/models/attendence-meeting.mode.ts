export class AttendenceMeeting {
  constructor(
    public id: number,
    public name: string,
    public date: Date,
    public isPresent: 'SI' | 'NO',
    public fine: number
  ) {}
}
