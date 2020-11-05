import { Reservation } from './../../model/reservation/reservation';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departure } from 'src/app/model/departure/departure';
import { User } from 'src/app/model/user/user';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  user: User = new User();
  reservacionUsuarioLogueado: Reservation = new Reservation();
  reservas: Reservation[] = [];
  ruta: Router;
  constructor(private router: Router, private reservationService: ReservationService) {
    this.ruta = router;
  }
  ngOnInit(): void {
    if ((this.ruta.url === '/reservas_lavadora')){
      this.reservacionUsuarioLogueado.espacio = 'LAVADORA';
    }
    this.user = JSON.parse(sessionStorage.getItem('usuario')) as User;
    this.reservationService.getReservas().subscribe(
      (reservas) => {
        this.reservas = reservas;
      }
    );
  }
  registrarReserva() {
    this.reservacionUsuarioLogueado.usuario = this.user;
    if (this.reservaValida()){
      this.reservationService.guardarReserva(this.reservacionUsuarioLogueado)
      .subscribe( data => {
        this.router.navigate(['/espacios']);
        alert('Reserva realizada satisfactoriamente');
      }, err => {
        this.router.navigate(['/espacios']);
        alert('Error al registar la reserva, verifique que los campos no esten vacios');
      });
    }
    else{
      alert('No se pudo realizar el registro');
    }
  }
  reservaValida(): boolean {
    return (this.reservacionUsuarioLogueado.espacio !== '' && this.reservacionUsuarioLogueado.espacio !== '' &&
    this.reservacionUsuarioLogueado.fechaInicial !== null && this.reservacionUsuarioLogueado.fechaFinal !== null);
  }

}
