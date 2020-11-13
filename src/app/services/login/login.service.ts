import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDENTIFICACIONSTORAGE, TIPOSTORAGE, TKSTORAGE } from 'src/app/consts/StorageKeys';
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
    } else if (this.usuario == null && localStorage.getItem(TIPOSTORAGE) != null) {
      this.usuario = JSON.parse(localStorage.getItem(TIPOSTORAGE)) as User;
      return this.usuario;
    }
    return new User();
  }

  public get token(): string {
    if (this.tokenValid != null) {
      return this.tokenValid;
    } else if (this.tokenValid == null && localStorage.getItem(TKSTORAGE) != null) {
      this.tokenValid = JSON.parse(localStorage.getItem(TKSTORAGE));
      return this.tokenValid;
    }
    return null;
  }

  async login(usuario: User) {
    const headersjson = new HttpHeaders({ 'Content-Type': 'application/json' });
    try {
      const token = await this.http.post<any>(LOGIN, usuario, { headers: headersjson }).toPromise();
      this.guardarToken(token.token);
      this.guardarUsuario(token.token);
    } catch (error) {
      this.logout();
    }
  }

  guardarUsuario(accessToken: string): void {
    const payload = this.obtenerDatosToken(accessToken);
    this.usuario = new User();
    this.usuario.identificacion = payload;
    localStorage.setItem(IDENTIFICACIONSTORAGE, JSON.stringify(this.usuario));
  }

  guardarToken(accessToken: string): void {
    localStorage.setItem(TKSTORAGE, JSON.stringify(accessToken));
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      const deleteBearer = accessToken.substring(7);
      const base64Url = deleteBearer.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload).sub;
    }
    return null;
  }

  isAutenticated(): boolean {
    if (JSON.parse(localStorage.getItem(TKSTORAGE)) != null) {
      return true;
    }
    return false;
  }

  logout(): void {
    this.tokenValid = null;
    this.usuario = null;
    localStorage.clear();
  }
}
