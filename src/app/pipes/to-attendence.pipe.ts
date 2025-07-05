import { Pipe, PipeTransform } from '@angular/core';
import { AttendenceMeeting } from '../models/attendence-meeting.mode';
import { Attendence } from '../models/attendence.model';
import { Meeting } from '../models/meeting.model';

@Pipe({
    name: 'toAttendence',
    standalone: false
})
export class ToAttendencePipe implements PipeTransform {
  transform(
    meetings: Meeting[],
    attendences: Attendence[]
  ): AttendenceMeeting[] {
    const res: AttendenceMeeting[] = [];
    for (let i = 0; i < meetings.length; i++) {
      const meeting = meetings[i];
      const partialRes: AttendenceMeeting = new AttendenceMeeting(
        meeting.id,
        meeting.name,
        meeting.date,
        'NO',
        meeting.fine_amount
      );

      for (let j = 0; j < attendences.length; j++) {
        const attendence = attendences[j];
        if (meeting.id == attendence.meeting.id) {
          partialRes.isPresent = 'SI';
          partialRes.fine = 0;
          break;
        }
      }
      res.push(partialRes);
    }
    return res;
  }
}
