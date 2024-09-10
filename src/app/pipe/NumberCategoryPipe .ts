import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberCategory',
  standalone: true,
})
export class NumberCategoryPipe implements PipeTransform {
  transform(value: any): string {
    if (typeof value !== 'number' && typeof value !== 'string') {
      return 'Invalid input';
    }

    const num = Number(value);

    if (isNaN(num)) {
      return 'Invalid input';
    }

    if (num >= 0 && num <= 49) {
      return ' Bad';
    } else if (num >= 50 && num <= 100) {
      return 'Good';
    } else {
      return 'Out of range';
    }
  }
}
