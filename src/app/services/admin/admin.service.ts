import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/model/admin/admin';
import { LISTAR_ADMINISTRADORES, INSERTAR_ADMINISTRADOR } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public getAdministrador(): Observable<Admin[]> {
    return this.http.get<Admin[]>(LISTAR_ADMINISTRADORES);
  }
  public createAdministrador(usuario: Admin): Observable<Admin> {
    const token = this.loginService.token;
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    httpHeaders.get('Authorization');
    httpHeaders.get('Content-Type');
    return this.http.post<Admin>(INSERTAR_ADMINISTRADOR, usuario, { headers: this.headersjson });
  }
}
