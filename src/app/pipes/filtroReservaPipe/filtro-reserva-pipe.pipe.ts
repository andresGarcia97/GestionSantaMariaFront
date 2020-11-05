import { Pipe, PipeTransform } from '@angular/core';
import { Reservation } from 'src/app/model/reservation/reservation';

@Pipe({
  name: 'filtroReservaPipe'
})
export class FiltroReservaPipePipe implements PipeTransform {

  transform(arreglo: Reservation[], texto: string): any[] {
    if (texto === '') {
      return arreglo;
    }
    else {
      return arreglo.filter(item => item.espacio.includes(texto));
    }
  }

}
