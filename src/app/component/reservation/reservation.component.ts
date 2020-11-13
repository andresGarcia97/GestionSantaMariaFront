import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ACADEMICO, AUDITORIO, LAVANDERIA, PERSONAL, RECREATIVO, SALA_INFORMATICA, SALA_TV, SALON3, SALON4, SALON_AMARILLO } from 'src/app/consts/consts';
import { ERROR_FECHA_RESERVACION, REGISTRO_RESERVA_ERRONEO, REGISTRO_RESERVA_EXITOSO, VERIFACION_DE_CAMPOS } from 'src/app/consts/messages';
import { TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { User } from 'src/app/model/user/user';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import swal from 'sweetalert';
import { Reservation } from './../../model/reservation/reservation';

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
  fechaActual: Date;
  mismoUsuario = false;
  reservaUpdate: Reservation = new Reservation();
  lugares = [{ lugar: LAVANDERIA }, { lugar: SALA_TV }, { lugar: SALA_INFORMATICA }, { lugar: AUDITORIO },
  { lugar: SALON_AMARILLO }, { lugar: SALON4 }, { lugar: SALON3 }];
  motivos = [{ motivo: PERSONAL }, { motivo: ACADEMICO }, { motivo: RECREATIVO }];
  rutaLavadora = false;

  constructor(private router: Router, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.ruta = this.router;
    this.resetInputs();
    this.rutaLavadora = this.ruta.url === RUTALAVADORA;
    if (this.rutaLavadora) {
      this.reservacionUsuarioLogueado.espacio = this.lugares[0].lugar;
      this.reservacionUsuarioLogueado.actividad = this.motivos[0].motivo;
      this.lavadora = LAVANDERIA;
    }
    this.user = JSON.parse(localStorage.getItem(TIPOSTORAGE)) as User;
    this.consultarReservas();
  }

  private consultarReservas(): void {
    this.reservationService.getReservas().subscribe(
      (reservas) => {
        this.reservas = reservas;
      }
    );
  }

  private resetInputs(): void {
    this.reservacionUsuarioLogueado = new Reservation();
    this.reservacionUsuarioLogueado.usuario = JSON.parse(localStorage.getItem(TIPOSTORAGE)) as User;
    this.reservacionUsuarioLogueado.fechaInicial = null;
    this.reservacionUsuarioLogueado.fechaFinal = null;
    this.reservacionUsuarioLogueado.espacio = '';
    this.reservacionUsuarioLogueado.actividad = '';
  }

  private cambiarFechas(): void {
    this.reservacionUsuarioLogueado.fechaInicial = new Date(this.reservacionUsuarioLogueado.fechaInicial);
    this.reservacionUsuarioLogueado.fechaFinal = new Date(this.reservacionUsuarioLogueado.fechaFinal);
  }

  registrarReserva(): void {
    this.cambiarFechas();
    console.log(this.reservacionUsuarioLogueado);
    if (this.reservaValida()) {
      console.log(this.reservacionUsuarioLogueado);
      this.reservationService.guardarReserva(this.reservacionUsuarioLogueado)
        .subscribe(() => {
          swal({ icon: 'success', title: REGISTRO_RESERVA_EXITOSO });
          this.resetInputs();
          this.consultarReservas();
        }, () => {
          swal({ icon: 'error', title: REGISTRO_RESERVA_ERRONEO });
        });
    }
    else {
      swal({ icon: 'error', title: VERIFACION_DE_CAMPOS });
    }
  }

  reservaValida(): boolean {
    return (this.reservacionUsuarioLogueado.espacio !== '' && this.reservacionUsuarioLogueado.actividad !== '' &&
      this.reservacionUsuarioLogueado.fechaInicial !== null && this.reservacionUsuarioLogueado.fechaFinal !== null);
  }

  private verificarFechas(): boolean {
    this.fechaActual = new Date();
    const fechaNumber = this.fechaActual.valueOf();
    return this.reservaUpdate.fechaInicial.valueOf() > fechaNumber &&
      this.reservaUpdate.fechaFinal.valueOf() > fechaNumber;
  }

  showPopupUpdate(reserva: Reservation) {
    this.reservaUpdate = reserva;
    const esMismoUsuario = this.reservaUpdate.usuario.identificacion === this.user.identificacion;
    if (!esMismoUsuario) {
      this.mismoUsuario = false;
    }
    else if (this.mismoUsuario && !this.verificarFechas()) {
      this.mismoUsuario = true;
    }
    else {
      this.mismoUsuario = false;
      swal({ icon: 'error', title: ERROR_FECHA_RESERVACION });
    }
  }

}
