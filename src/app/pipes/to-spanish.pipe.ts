import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toSpanish',
    standalone: false
})
export class ToSpanishPipe implements PipeTransform {
  transform(value: string): string {
    let res = value;
    switch (value) {
      case 'COMPLETE':
        res = 'COMPLETO';
        break;
      case 'MONTHLYPAYMENTS':
        res = 'MENSUALIDADES';
        break;

      case 'CONTRIBUTIONS':
        res = 'APORTES';
        break;

      case 'CERTIFICATIONS':
        res = 'CERTIFICACIONES';
        break;

      case 'FINES':
        res = 'MULTAS';
        break;
      case 'EXTRA_CONTRIBUTIONS':
        res = 'APORTES EXTRAS';
        break;
      case 'INCOMES':
        res = 'INGRESOS EXTRAS';
        break;
    }

    return res;
  }
}
