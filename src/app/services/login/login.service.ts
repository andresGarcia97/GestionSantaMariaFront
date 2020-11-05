import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TKSTORAGE, USUARIOSTORAGE } from 'src/app/consts/StorageKeys';
import { LOGIN } from '../../../environments/environment';
import { User } from '../../model/user/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private usuario: User;
  private tokenValid: string;

  constructor(private http: HttpClient) { }

  public get user(): User {
    if (this.usuario != null) {
      return this.usuario;
    } else if (this.usuario == null && sessionStorage.getItem(USUARIOSTORAGE) != null) {
      this.usuario = JSON.parse(sessionStorage.getItem(USUARIOSTORAGE)) as User;
      return this.usuario;
    }
    return new User();
  }

  public get token(): string {
    if (this.tokenValid != null) {
      return this.tokenValid;
    } else if (this.tokenValid == null && sessionStorage.getItem(TKSTORAGE) != null) {
      this.tokenValid = sessionStorage.getItem(TKSTORAGE);
      return this.tokenValid;
    }
    return null;
  }

  login(usuario: User): Observable<any> {
    return this.http.post<any>(LOGIN, usuario, { observe: 'response' });
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
    sessionStorage.setItem(USUARIOSTORAGE, JSON.stringify(this.usuario));
  }

  guardarToken(): void {
    sessionStorage.setItem(TKSTORAGE, this.tokenValid);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      this.tokenValid = accessToken.split(' ')[1];
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAutenticated(): boolean {
    if (sessionStorage.getItem(TKSTORAGE) != null) {
      return true;
    }
    return false;
  }

  logout(): void {
    this.tokenValid = null;
    this.usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem(TKSTORAGE);
    sessionStorage.removeItem(USUARIOSTORAGE);
  }
}
