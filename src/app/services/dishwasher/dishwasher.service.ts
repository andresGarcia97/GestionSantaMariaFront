import { Dishwasher } from './../../model/dishwasher/dishwasher';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCALHOST } from 'src/environments/environment';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';

const ENDPOINT_LAVADO_LOZA = LOCALHOST.concat('lavadoloza/');
const OBTENER_HORARIOS_LOZA = ENDPOINT_LAVADO_LOZA.concat('horarios');
const GUARDAR_HORARIOS_LOZA = ENDPOINT_LAVADO_LOZA.concat('guardarhorario');
const ACTUALIZAR_HORARIOS_LOZA = ENDPOINT_LAVADO_LOZA.concat('actualizarhorario');
const ELIMINAR_HORARIOS_LOZA = ENDPOINT_LAVADO_LOZA.concat('eliminarhorarios');
@Injectable({
  providedIn: 'root'
})
export class DishwasherService {
  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json' , Authorization: this.loginService.token});
  constructor(private http: HttpClient, private loginService: LoginService) { }

  public getHorariosLoza(): Observable<Dishwasher[]> {
    return this.http.get<Dishwasher[]>(OBTENER_HORARIOS_LOZA, { headers: this.headersjson});
  }

  public guardarHorario(horarios: Dishwasher[]): Observable<Dishwasher[]> {
    return this.http.post<Dishwasher[]>(GUARDAR_HORARIOS_LOZA, horarios, { headers: this.headersjson});
  }

  public updateHorario(horario: Dishwasher[]): Observable<Dishwasher[]>  {
    return this.http.put<Dishwasher[]>(ACTUALIZAR_HORARIOS_LOZA, horario, { headers: this.headersjson });
  }

  public delete(horario: Dishwasher): Observable<Dishwasher> {
    const options = {
      headers: this.headersjson,
      body: horario
    };
    return this.http.delete<Dishwasher>(ELIMINAR_HORARIOS_LOZA , options);
  }
}
