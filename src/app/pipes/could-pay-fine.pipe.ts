import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'couldPayFine',
})
export class CouldPayFinePipe implements PipeTransform {
  transform(attendence: string, subscriptionAt: string): boolean {
    const attendenceDate = new Date(attendence);
    const subscriptionDate = new Date(subscriptionAt);
    return attendenceDate < subscriptionDate;
  }
}
