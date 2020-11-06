import { Departure } from './../../model/departure/departure';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { LOCALHOST } from 'src/environments/environment';

const ENDPOINT_SALIDA = LOCALHOST.concat('salidas/');
const CREAR_SALIDA = ENDPOINT_SALIDA.concat('guardarsalida');
const LISTAR_SALIDAS = ENDPOINT_SALIDA.concat('consultar');
@Injectable({
  providedIn: 'root'
})
export class DepartureService {
  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json' , Authorization: this.loginService.token});

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public createSalida(nuevaSalida: Departure): Observable<Departure> {
    return this.http.post<Departure>(CREAR_SALIDA, nuevaSalida, { headers: this.headersjson });
  }
  public listAllSalidas(): Observable<Departure[]> {
    return this.http.get<Departure[]>(LISTAR_SALIDAS, { headers: this.headersjson});
  }
}
