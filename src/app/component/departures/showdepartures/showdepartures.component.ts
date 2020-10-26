import { DepartureService } from './../../../services/departures/departure.service';
import { Departure } from './../../../model/departure/departure';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-showdepartures',
  templateUrl: './showdepartures.component.html',
  styleUrls: ['./showdepartures.component.css']
})
export class ShowdeparturesComponent implements OnInit {
  user: User = new User();
  salidaUsuarioLogueado: Departure = new Departure();
  salidas: Departure[] = [];
  constructor(private router: Router, private salidaService: DepartureService) { }
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('usuario')) as User;
    this.salidaService.listAllSalidas().subscribe(
      (salidas) => {
        this.salidas = salidas;
      }
    );
  }
  registrarSalida() {
    this.salidaUsuarioLogueado.estudianteSalida = this.user;
    if (this.salidaValida(this.salidaUsuarioLogueado)){
    this.salidaService.createSalida(this.salidaUsuarioLogueado)
      .subscribe(data => {
        this.router.navigate(['/mostrarplanilla']);
        alert('Registro de la salida realizada satisfactoriamente');
      }, err => {
        this.router.navigate(['/mostrarplanilla']);
        alert('Error al registar la salida, verifique que los campos no esten vacios');
      });
    this.router.navigate(['/mostrarplanilla']);
    }
    else{
      alert('No se pudo registrar la salida');
    }
  }
  salidaValida(salida: Departure): boolean {
    return !(salida.fechaLlegada == null || salida.fechaSalida == null ||
      (salida.lugar === null || salida.lugar === '') || (salida.razon === null || salida.razon === ''));
  }

}
