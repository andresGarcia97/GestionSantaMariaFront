import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ACADEMICO, AUDITORIO, LAVANDERIA, PERSONAL, RECREATIVO, SALA_INFORMATICA, SALA_TV, SALON3, SALON4, SALON_AMARILLO } from 'src/app/consts/consts';
import {
  ACTUALIZACION_RESERVA_ERRONEO, ACTUALIZACION_RESERVA_EXITOSO, BORRADO_RESERVA_ERRONEO, BORRADO_RESERVA_EXITOSO, ERROR_FECHA_RESERVACION,
  ERROR_RESERVACION_DIFERENTE_USUARIO, ORDEN_INCORRECTO_FECHAS, REGISTRO_RESERVA_ERRONEO, REGISTRO_RESERVA_EXITOSO,
  VERIFACION_DE_CAMPOS, VERIFACION_DE_FECHAS
} from 'src/app/consts/messages';
import { TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { User } from 'src/app/model/user/user';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { UtilService } from 'src/app/services/util/util.service';
import swal from 'sweetalert';
import { Reservation } from './../../model/reservation/reservation';

const RUTALAVADORA = '/reservas_lavadora';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html'
})
export class ReservationComponent implements OnInit {

  user: User = new User();
  reservacionUsuarioLogueado: Reservation = new Reservation();
  reservas: Reservation[] = [];
  ruta: Router;
  lavadora = '';
  mismoUsuario = false;
  tipoUsuario = false;
  nuevaReserva: Reservation = new Reservation();
  reservaUpdate: Reservation = new Reservation();
  lugares = [{ lugar: LAVANDERIA }, { lugar: SALA_TV }, { lugar: SALA_INFORMATICA }, { lugar: AUDITORIO },
  { lugar: SALON_AMARILLO }, { lugar: SALON4 }, { lugar: SALON3 }];
  motivos = [{ motivo: PERSONAL }, { motivo: ACADEMICO }, { motivo: RECREATIVO }];
  rutaLavadora = false;

  constructor(private router: Router, private reservationService: ReservationService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.ruta = this.router;
    this.resetInputs();
    this.rutaLavadora = this.ruta.url === RUTALAVADORA;
    if (this.rutaLavadora) {
      this.reservacionUsuarioLogueado.espacio = this.lugares[0].lugar;
      this.reservacionUsuarioLogueado.actividad = this.motivos[0].motivo;
      this.lavadora = LAVANDERIA;
    } else {
      this.lugares.splice(0, 1);
    }
    this.user = JSON.parse(localStorage.getItem(TIPOSTORAGE)) as User;
    this.tipoUsuario = this.utilService.isEstudent(this.user);
    this.consultarReservas();
  }

  private consultarReservas(): void {
    if (this.tipoUsuario) {
      const reservaConsulta = new Reservation();
      reservaConsulta.fechaInicial = new Date();
      this.reservationService.reservasPorDia(reservaConsulta).subscribe(
        (reservas) => {
          this.reservas = reservas;
        }
      );
    }
    else {
      this.reservationService.getReservas().subscribe(
        (reservas) => {
          if (this.rutaLavadora) {
            this.reservas = reservas;
          }
          else {
            this.reservas = reservas.filter(reserva => reserva.espacio !== LAVANDERIA);
          }
        }
      );
    }
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

  private fechaInicialMenorQueFinal(fechaInicial: Date, fechaFinal: Date): boolean {
    const fechaInicio = this.utilService.convertDateToNumber(fechaInicial);
    const fechaFin = this.utilService.convertDateToNumber(fechaFinal);
    return fechaInicio < fechaFin;
  }

  public registrarReserva(): void {
    this.cambiarFechas();
    console.log(this.reservacionUsuarioLogueado);
    if (!this.reservaValida()) {
      swal({ icon: 'warning', title: VERIFACION_DE_CAMPOS });
    }
    else if (!this.utilService.verificarFechas(this.reservacionUsuarioLogueado.fechaInicial, this.reservacionUsuarioLogueado.fechaFinal)) {
      swal({ icon: 'warning', title: VERIFACION_DE_FECHAS });
    }
    else if (!this.fechaInicialMenorQueFinal(this.reservacionUsuarioLogueado.fechaInicial, this.reservacionUsuarioLogueado.fechaFinal)) {
      swal({ icon: 'warning', title: ORDEN_INCORRECTO_FECHAS });
    }
    else {
      this.reservationService.guardarReserva(this.reservacionUsuarioLogueado)
        .subscribe(() => {
          swal({ icon: 'success', title: REGISTRO_RESERVA_EXITOSO });
          this.resetInputs();
          this.consultarReservas();
        }, () => {
          swal({ icon: 'error', title: REGISTRO_RESERVA_ERRONEO });
        });
    }
  }

  public reservaValida(): boolean {
    return (this.reservacionUsuarioLogueado.espacio !== '' && this.reservacionUsuarioLogueado.actividad !== '' &&
      this.reservacionUsuarioLogueado.fechaInicial !== null && this.reservacionUsuarioLogueado.fechaFinal !== null);
  }

  private setNuevaReserva(): void {
    this.nuevaReserva.fechaFinal = null;
    this.nuevaReserva.fechaInicial = null;
    this.nuevaReserva.usuario = this.reservaUpdate.usuario;
    this.nuevaReserva.espacio = this.reservaUpdate.espacio;
    this.nuevaReserva.actividad = this.reservaUpdate.actividad;
  }

  public showPopupUpdate(reserva: Reservation) {
    this.reservaUpdate = reserva;
    this.setNuevaReserva();
    const esMismoUsuario = this.reservaUpdate.usuario.identificacion === this.user.identificacion;
    const verificarFechaPasada = this.utilService.verificarFechas(this.reservaUpdate.fechaInicial, this.reservaUpdate.fechaFinal);
    if (!esMismoUsuario) {
      this.mismoUsuario = false;
      swal({ icon: 'error', title: ERROR_RESERVACION_DIFERENTE_USUARIO });
    }
    else if (esMismoUsuario && verificarFechaPasada) {
      this.mismoUsuario = true;
    }
    else if (!verificarFechaPasada) {
      this.mismoUsuario = false;
      swal({ icon: 'error', title: ERROR_FECHA_RESERVACION });
    }
  }

  private cambiarFechasActulizacion(): void {
    this.nuevaReserva.fechaInicial = new Date(this.nuevaReserva.fechaInicial);
    this.nuevaReserva.fechaFinal = new Date(this.nuevaReserva.fechaFinal);
  }

  public reservaValidaActualizacion(): boolean {
    return (this.nuevaReserva.espacio !== '' && this.nuevaReserva.actividad !== '' &&
      this.nuevaReserva.fechaInicial !== null && this.nuevaReserva.fechaFinal !== null);
  }

  private resetInputsUpdate(): void {
    this.reservaUpdate = new Reservation();
    this.mismoUsuario = false;
  }

  public editarReserva(): void {
    const reservas = [];
    reservas.push(this.reservaUpdate);
    this.cambiarFechasActulizacion();
    console.log(this.nuevaReserva);
    if (!this.reservaValidaActualizacion()) {
      swal({ icon: 'warning', title: VERIFACION_DE_CAMPOS });
    }
    else if (!this.utilService.verificarFechas(this.nuevaReserva.fechaInicial, this.nuevaReserva.fechaFinal)) {
      swal({ icon: 'warning', title: VERIFACION_DE_FECHAS });
    }
    else if (!this.fechaInicialMenorQueFinal(this.nuevaReserva.fechaInicial, this.nuevaReserva.fechaFinal)) {
      swal({ icon: 'warning', title: ORDEN_INCORRECTO_FECHAS });
    }
    else {
      reservas.push(this.nuevaReserva);
      console.log(this.reservas);
      this.reservationService.updateReservas(reservas)
        .subscribe(() => {
          swal({ icon: 'success', title: ACTUALIZACION_RESERVA_EXITOSO });
          this.resetInputsUpdate();
          this.consultarReservas();
        }, (error) => {
          console.log(error);
          swal({ icon: 'error', title: ACTUALIZACION_RESERVA_ERRONEO });
        });
    }
  }

  public eliminarReserva(): void {
    this.reservationService.delete(this.reservaUpdate)
      .subscribe(() => {
        swal({ icon: 'success', title: BORRADO_RESERVA_EXITOSO });
        this.resetInputsUpdate();
        this.consultarReservas();
      }, () => {
        swal({ icon: 'error', title: BORRADO_RESERVA_ERRONEO });
      });
  }

}
