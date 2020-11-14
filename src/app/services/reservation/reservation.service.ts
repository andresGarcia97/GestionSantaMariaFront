import { Reservation } from './../../model/reservation/reservation';
import { Injectable } from '@angular/core';
import { LOCALHOST } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

const ENDPOINT_RESERVAS = LOCALHOST.concat('reservas/');
const LISTAR_RESERVAS = ENDPOINT_RESERVAS.concat('listar');
const CREAR_RESERVA = ENDPOINT_RESERVAS.concat('crearreserva');
const RESERVAS_POR_DIA = ENDPOINT_RESERVAS.concat('pordia');
const ELIMINAR_RESERVA = ENDPOINT_RESERVAS.concat('borrarreserva');
const ACTUALIZAR_RESERVAS = ENDPOINT_RESERVAS.concat('actualizarreserva');
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.loginService.token });
  constructor(private http: HttpClient, private loginService: LoginService) { }

  public getReservas(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(LISTAR_RESERVAS, { headers: this.headersjson });
  }

  public guardarReserva(reservas: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(CREAR_RESERVA, reservas, { headers: this.headersjson });
  }

  public reservasPorDia(reserva: Reservation): Observable<Reservation[]> {
    return this.http.post<Reservation[]>(RESERVAS_POR_DIA, reserva, { headers: this.headersjson });
  }

  public updateReservas(reservas: Reservation[]): Observable<Reservation[]> {
    return this.http.put<Reservation[]>(ACTUALIZAR_RESERVAS, reservas, { headers: this.headersjson });
  }

  public delete(reserva: Reservation): Observable<Reservation> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.loginService.token }),
      body: {
        usuario: { identificacion: reserva.usuario.identificacion },
        fechaInicial: reserva.fechaInicial,
        actividad: reserva.actividad,
        fechaFinal: reserva.fechaFinal,
        espacio: reserva.espacio
      }
    };
    return this.http.delete<Reservation>(ELIMINAR_RESERVA, options);
  }
}
