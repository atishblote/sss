import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeToSeconds',
  standalone: true
})
export class TimeToSecondsPipe implements PipeTransform {

  transform(openTime: string): boolean {
    const fifteenMinutes = 15 * 60; // 15 minutes in seconds

    // Parse the opening time to get hours, minutes, and meridiem
    const [time, meridiem] = openTime.split(/\s+/);
    let [hour, minute] = time.split(':').map(part => parseInt(part, 10));

    // Convert to 24-hour format if necessary
    if (meridiem && meridiem.toLowerCase() === 'pm' && hour !== 12) {
      hour += 12;
    } else if (meridiem && meridiem.toLowerCase() === 'am' && hour === 12) {
      hour = 0;
    }

    // Get the opening time in seconds
    const openTimeSeconds = hour * 3600 + minute * 60;

    // Get the current time in seconds
    const currentDate = new Date();
    const currentSeconds = currentDate.getHours() * 3600 + currentDate.getMinutes() * 60 + currentDate.getSeconds();

    // Calculate the range
    const beforeTime = openTimeSeconds - fifteenMinutes;
    const afterTime = openTimeSeconds + fifteenMinutes;

    return currentSeconds >= beforeTime && currentSeconds <= afterTime;
  }
}
