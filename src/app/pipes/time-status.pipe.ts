import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeStatus',
  standalone: true
})
export class TimeStatusPipe implements PipeTransform {

  transform(dateString: string): string {
    const currentDate = new Date();
    const dateParts = dateString.split('/');
    const date = new Date(
      parseInt(dateParts[2]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[0])
    );

    if (currentDate.toDateString() === date.toDateString()) {
      return 'New';
    } else {
      return 'Old';
    }
  }
}
