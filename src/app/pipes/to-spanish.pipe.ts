import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toSpanish',
})
export class ToSpanishPipe implements PipeTransform {
  transform(value: string): string {
    let res = value;
    switch (value) {
      case 'COMPLETE':
        res = 'COMPLETO';
        break;
    }
    return res;
  }
}
