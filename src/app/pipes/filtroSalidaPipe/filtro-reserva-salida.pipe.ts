import { Pipe, PipeTransform } from '@angular/core';
import { Departure } from 'src/app/model/departure/departure';
import { User } from 'src/app/model/user/user';

@Pipe({
  name: 'filtroSalida'
})
export class FiltroSalidaPipe implements PipeTransform {

  transform(arreglo: Departure[], estudiante: boolean, usuarioLogueado: User): any[] {
    if (!estudiante) {
      return arreglo;
    }
    else {
      return arreglo.filter(item => item.estudianteSalida.identificacion === usuarioLogueado.identificacion);
    }
  }

}
