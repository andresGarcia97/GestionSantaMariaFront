import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Labor } from 'src/app/model/labor/labor';
import { LOCALHOST } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

const ENDPOINT_LABOR = LOCALHOST.concat('labores/');
const LISTAR_LABORES = ENDPOINT_LABOR.concat('listar');
const GUARDAR_LABOR = ENDPOINT_LABOR.concat('guardarlabor');
const ACTUALIZAR_LABOR = ENDPOINT_LABOR.concat('actualizarlabor');
const ELIMINAR_LABOR = ENDPOINT_LABOR.concat('eliminarlabor');

@Injectable({
  providedIn: 'root'
})
export class LaborService {

  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json' , Authorization: this.loginService.token});

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public getReservas(): Observable<Labor[]> {
    return this.http.get<Labor[]>(LISTAR_LABORES, { headers: this.headersjson});
  }

  public guardarLabor(labor: Labor): Observable<Labor> {
    return this.http.post<Labor>(GUARDAR_LABOR, labor, { headers: this.headersjson});
  }
}
