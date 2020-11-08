import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { REGISTRO_SALIDA_ERRONEO, REGISTRO_SALIDA_ERROR, REGISTRO_SALIDA_SATISFACTORIO } from 'src/app/consts/messages';
import { TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { Student } from 'src/app/model/student/student';
import { User } from 'src/app/model/user/user';
import { UtilService } from 'src/app/services/util/util.service';
import { Departure } from './../../../model/departure/departure';
import { DepartureService } from './../../../services/departures/departure.service';

const RUTAMOSTRARPLANILLA = '/mostrarplanilla';

@Component({
  selector: 'app-showdepartures',
  templateUrl: './showdepartures.component.html'
})
export class ShowdeparturesComponent implements OnInit {

  user: User = new User();
  salidaUsuarioLogueado: Departure = new Departure();
  salidas: Departure[] = [];
  tipoUsuario = false;

  constructor(private router: Router, private salidaService: DepartureService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(TIPOSTORAGE)) as User;
    this.tipoUsuario = this.utilService.isEstudent(this.user as Student);
    this.salidaService.listAllSalidas().subscribe(
      (salidas) => {
        this.salidas = salidas;
      }
    );
  }

  registrarSalida() {
    this.salidaUsuarioLogueado.estudianteSalida = this.user;
    if (this.salidaValida(this.salidaUsuarioLogueado)) {
      this.salidaService.createSalida(this.salidaUsuarioLogueado)
        .subscribe(() => {
          this.router.navigate([RUTAMOSTRARPLANILLA]);
          alert(REGISTRO_SALIDA_SATISFACTORIO);
        }, () => {
          this.router.navigate([RUTAMOSTRARPLANILLA]);
          alert(REGISTRO_SALIDA_ERRONEO);
        });
      this.router.navigate([RUTAMOSTRARPLANILLA]);
    }
    else {
      alert(REGISTRO_SALIDA_ERROR);
    }
  }
  salidaValida(salida: Departure): boolean {
    return !(salida.fechaLlegada == null || salida.fechaSalida == null ||
      (salida.lugar === null || salida.lugar === '') || (salida.razon === null || salida.razon === ''));
  }

}
