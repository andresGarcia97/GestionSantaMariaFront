import { Injectable } from '@angular/core';
import { User } from '../../model/user/user';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { LOGIN } from '../../../environments/environment';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private usuario: User;
  private tokenValid: string;

  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  public get user(): User {
    if (this.usuario != null) {
      return this.usuario;
    } else if (this.usuario == null && sessionStorage.getItem('usuario') != null) {
      this.usuario = JSON.parse(sessionStorage.getItem('usuario')) as User;
      return this.usuario;
    }
    return new User();
  }

  public get token(): string {
    if (this.tokenValid != null) {
      return this.tokenValid;
    } else if (this.tokenValid == null && sessionStorage.getItem('token') != null) {
      this.tokenValid = sessionStorage.getItem('token');
      return this.tokenValid;
    }
    return null;
  }

  login(usuario: User): Observable<any> {
    return this.http.post<any>(LOGIN, usuario, { observe: 'response'});
  }

  guardarUsuario(accessToken: string): void {
    const payload = this.obtenerDatosToken(accessToken);
    this.usuario = new User();
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (accessToken != null) {
      httpHeaders = httpHeaders.append(
        'Authorization',
        accessToken
      );
    }
    httpHeaders.get('Authorization');
    httpHeaders.get('Content-Type');
    this.usuario.identificacion = payload.sub;
    // this.usuario.tipoUsuario = payload.tipo_usuario;
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  guardarToken(): void {
    sessionStorage.setItem('token', this.tokenValid);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      this.tokenValid = accessToken.split(' ')[1];
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAutenticated(): boolean {
    if (sessionStorage.getItem('token') != null){
      return true;
    }
    return false;
  }

  logout(): void {
    this.tokenValid = null;
    this.usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
