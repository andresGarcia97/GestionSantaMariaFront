import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/model/admin/admin';
import { INSERTAR_ADMINISTRADOR, LISTAR_ADMINISTRADORES } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.loginService.token });

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public getAdministrador(): Observable<Admin[]> {
    return this.http.get<Admin[]>(LISTAR_ADMINISTRADORES);
  }

  public createAdministrador(usuario: Admin): Observable<Admin> {
    return this.http.post<Admin>(INSERTAR_ADMINISTRADOR, usuario, { headers: this.headersjson });
  }
}
