import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { REGISTRO_SALIDA_ERRONEO, REGISTRO_SALIDA_ERROR, REGISTRO_SALIDA_SATISFACTORIO } from 'src/app/consts/messages';
import { USUARIOSTORAGE } from 'src/app/consts/StorageKeys';
import { User } from 'src/app/model/user/user';
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
  constructor(private router: Router, private salidaService: DepartureService) { }
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem(USUARIOSTORAGE)) as User;
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
