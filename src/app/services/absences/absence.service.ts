import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Absence } from 'src/app/model/absence/absence';
import { LOCALHOST } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

const ENDPOINT_INASISTENCIA = LOCALHOST.concat('inasistencias/');
const CREAR_INASISTENCIA = ENDPOINT_INASISTENCIA.concat('crearinasistencias/');
const LISTAR_INASISTENCIAS = ENDPOINT_INASISTENCIA.concat('listarinasistencias/');

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.loginService.token });

  public getInasistencias(): Observable<Absence[]> {
    return this.http.get<Absence[]>(LISTAR_INASISTENCIAS, { headers: this.headersjson });
  }

  public createInasistencia(inasistencias: Absence[]): Observable<Absence[]> {
    return this.http.post<Absence[]>(CREAR_INASISTENCIA, inasistencias, { headers: this.headersjson });
  }

}
