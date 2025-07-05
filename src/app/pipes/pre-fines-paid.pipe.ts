import { Pipe, PipeTransform } from '@angular/core';
import { Attendence } from '../models/attendence.model';
import { Fine } from '../models/fine.model';
import { Meeting } from '../models/meeting.model';
import { PreFinesPaid } from '../models/pre-fines-paid.model';

@Pipe({
    name: 'preFinesPaid',
    standalone: false
})
export class PreFinesPaidPipe implements PipeTransform {
  transform(
    meetings: Meeting[],
    attendences: Attendence[],
    fines: Fine[]
  ): PreFinesPaid[] {
    const preFinesPaid: PreFinesPaid[] = [];

    for (let i = 0; i < meetings.length; i++) {
      const meeting = meetings[i];
      const preFinePaid = new PreFinesPaid(
        meeting.id,
        meeting.name,
        meeting.date,
        'NO',
        meeting.fine_amount,
        0
      );

      for (let j = 0; j < attendences.length; j++) {
        const attendece = attendences[j];
        if (attendece.meeting.id === meeting.id) {
          preFinePaid.attendence = 'SI';
          preFinePaid.fine = 0;
          break;
        }
      }

      for (let k = 0; k < fines.length; k++) {
        const fine = fines[k];
        if (fine.meeting.id === meeting.id) {
          preFinePaid.finePaid = fine.fine_paid;
          break;
        }
      }
      preFinesPaid.push(preFinePaid);
    }
    return preFinesPaid;
  }
}
