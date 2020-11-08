import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LAVADORA, LAVANDERIA } from 'src/app/consts/consts';
import { REGISTRO_RESERVA_ERRONEO, REGISTRO_RESERVA_EXITOSO, VERIFACION_DE_CAMPOS } from 'src/app/consts/messages';
import { TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { User } from 'src/app/model/user/user';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { Reservation } from './../../model/reservation/reservation';

const RUTAESPACIOS = '/espacios';
const RUTALAVADORA = '/reservas_lavadora';

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
  lavadora = '';
  constructor(private router: Router, private reservationService: ReservationService) {
    this.ruta = router;
  }
  ngOnInit(): void {
    if (this.ruta.url === RUTALAVADORA) {
      this.reservacionUsuarioLogueado.espacio = LAVADORA;
      this.lavadora = LAVANDERIA;
    }
    this.user = JSON.parse(localStorage.getItem(TIPOSTORAGE)) as User;
    this.reservationService.getReservas().subscribe(
      (reservas) => {
        this.reservas = reservas;
      }
    );
  }
  registrarReserva() {
    this.reservacionUsuarioLogueado.usuario = this.user;
    if (this.reservaValida()) {
      this.reservationService.guardarReserva(this.reservacionUsuarioLogueado)
        .subscribe(() => {
          this.router.navigate([RUTAESPACIOS]);
          alert(REGISTRO_RESERVA_EXITOSO);
        }, () => {
          this.router.navigate([RUTAESPACIOS]);
          alert(REGISTRO_RESERVA_ERRONEO);
        });
    }
    else {
      alert(VERIFACION_DE_CAMPOS);
    }
  }
  reservaValida(): boolean {
    return (this.reservacionUsuarioLogueado.espacio !== '' && this.reservacionUsuarioLogueado.espacio !== '' &&
      this.reservacionUsuarioLogueado.fechaInicial !== null && this.reservacionUsuarioLogueado.fechaFinal !== null);
  }

}
