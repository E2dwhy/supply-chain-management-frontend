<<<<<<< HEAD
import { DateTime } from 'luxon';

export function createDateArray(length: number) {
  const dates: number[] = [];

  for (let i = 0; i < length; i++) {
    dates.push(+DateTime.local().minus({ day: i }).toJSDate());
  }

  return dates.reverse();
}

=======
import { DateTime } from 'luxon';

export function createDateArray(length: number) {
  const dates: number[] = [];

  for (let i = 0; i < length; i++) {
    dates.push(+DateTime.local().minus({ day: i }).toJSDate());
  }

  return dates.reverse();
}

>>>>>>> 98d0c17... feat: push base  code to repository
