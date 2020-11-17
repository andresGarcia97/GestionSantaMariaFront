import { Pipe, PipeTransform } from '@angular/core';
import { Absence } from 'src/app/model/absence/absence';
import { User } from 'src/app/model/user/user';

@Pipe({
  name: 'filtroInasistencia'
})
export class FiltroInasistenciaPipe implements PipeTransform {

  transform(arreglo: Absence[], estudiante: boolean, usuarioLogueado: User): any[] {
    if (!estudiante) {
      return arreglo;
    }
    else {
      return arreglo.filter(item => item.estudianteInasistencia.identificacion === usuarioLogueado.identificacion);
    }
  }

}
