import { Component, OnInit } from '@angular/core';
import { ACADEMICO, PERSONAL, RECREATIVO } from 'src/app/consts/consts';
import { REGISTRO_SALIDA_ERRONEO, REGISTRO_SALIDA_ERROR, REGISTRO_SALIDA_SATISFACTORIO, VERIFACION_DE_FECHAS } from 'src/app/consts/messages';
import { TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { User } from 'src/app/model/user/user';
import { UtilService } from 'src/app/services/util/util.service';
import swal from 'sweetalert';
import { Departure } from './../../../model/departure/departure';
import { DepartureService } from './../../../services/departures/departure.service';

@Component({
  selector: 'app-showdepartures',
  templateUrl: './showdepartures.component.html'
})
export class ShowdeparturesComponent implements OnInit {

  user: User = new User();
  salidaUsuarioLogueado: Departure = new Departure();
  salidas: Departure[] = [];
  tipoUsuario = false;
  motivos = [{ motivo: PERSONAL }, { motivo: ACADEMICO }, { motivo: RECREATIVO }];

  constructor(private salidaService: DepartureService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(TIPOSTORAGE)) as User;
    this.resetInputs();
    this.tipoUsuario = this.utilService.isEstudent(this.user as User);
    this.salidaService.listAllSalidas().subscribe(
      (salidas) => {
        this.salidas = salidas;
      }
    );
  }

  private cambiarFechas(): void {
    this.salidaUsuarioLogueado.fechaSalida = new Date(this.salidaUsuarioLogueado.fechaSalida);
    this.salidaUsuarioLogueado.fechaLlegada = new Date(this.salidaUsuarioLogueado.fechaLlegada);
  }

  private resetInputs(): void {
    this.salidaUsuarioLogueado = new Departure();
    this.salidaUsuarioLogueado.estudianteSalida = this.user;
    this.salidaUsuarioLogueado.fechaSalida = null;
    this.salidaUsuarioLogueado.fechaLlegada = null;
    this.salidaUsuarioLogueado.lugar = '';
    this.salidaUsuarioLogueado.razon = '';
  }

  registrarSalida() {
    this.cambiarFechas();
    this.salidaUsuarioLogueado.estudianteSalida = this.user;
    const fechasNoPasadas = this.utilService.verificarFechas
      (this.salidaUsuarioLogueado.fechaSalida, this.salidaUsuarioLogueado.fechaLlegada);
    if (this.salidaValida(this.salidaUsuarioLogueado) && fechasNoPasadas) {
      this.salidaService.createSalida(this.salidaUsuarioLogueado)
        .subscribe(() => {
          swal({ icon: 'success', title: REGISTRO_SALIDA_SATISFACTORIO });
          this.salidas.push(this.salidaUsuarioLogueado);
          this.resetInputs();
        }, () => {
          swal({ icon: 'error', title: REGISTRO_SALIDA_ERRONEO });
        });
    }
    else if (!fechasNoPasadas) {
      swal({ icon: 'warning', title: VERIFACION_DE_FECHAS });
    }
    else {
      swal({ icon: 'error', title: REGISTRO_SALIDA_ERROR });
    }
  }

  salidaValida(salida: Departure): boolean {
    return !(salida.fechaLlegada == null || salida.fechaSalida == null ||
      (salida.lugar === null || salida.lugar === '') || (salida.razon === null || salida.razon === ''));
  }

}
