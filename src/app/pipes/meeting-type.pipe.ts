import { Pipe, PipeTransform } from '@angular/core'
import { MeetingType } from '@models/meeting.model'

@Pipe({
  name: 'meetingType',
})
export class MeetingTypePipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return '--'

    switch (value) {
      case MeetingType.EXTRAORDINARY:
        return 'A. Extraordinaria'
      case MeetingType.GENERAL:
        return 'A. General'
      case MeetingType.MEETING:
        return 'Concentración'
      case MeetingType.PARADE:
        return 'Desfile'
      case MeetingType.PROTEST:
        return 'Marcha'
      default:
        return value
    }
  }
}
