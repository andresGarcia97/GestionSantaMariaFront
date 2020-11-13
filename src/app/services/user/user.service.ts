import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { DtoChangePassword } from 'src/app/model/changePassword/dto-change-password';
import { User } from 'src/app/model/user/user';
import {
  ACTUALIZAR_USUARIO, BUSCAR_USUARIO, CAMBIAR_CONTRASEÑA, ELIMINAR_USUARIO, INSERTAR_ADMINISTRADOR,
  INSERTAR_ESTUDIANTE, LISTAR_ADMINISTRADORES, LISTAR_ESTUDIANTES
} from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.loginService.token });

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public listAllStudents(): Observable<User[]> {
    return this.http.get<User[]>(LISTAR_ESTUDIANTES, { headers: this.headersjson });
  }
  public listAllAdmins(): Observable<User[]> {
    return this.http.get<User[]>(LISTAR_ADMINISTRADORES, { headers: this.headersjson });
  }
  public getAdministrador(): Observable<User[]> {
    return this.http.get<User[]>(LISTAR_ADMINISTRADORES, { headers: this.headersjson });
  }
  public async getUsuario(usuario: User) {
    try {
      const user = await this.http.post<User>(BUSCAR_USUARIO, usuario, { headers: this.headersjson }).toPromise();
      this.guardarTipoUsuario(user);
    } catch (error) {
      this.removerTipoUsuario();
    }
  }
  public createAdministrador(usuario: User): Observable<User> {
    return this.http.post<User>(INSERTAR_ADMINISTRADOR, usuario, { headers: this.headersjson });
  }
  public createEstudiante(usuario: User): Observable<User> {
    return this.http.post<User>(INSERTAR_ESTUDIANTE, usuario, { headers: this.headersjson });
  }
  public delete(id: number): Observable<User> {
    return this.http.delete<User>(ELIMINAR_USUARIO.concat(id.toString()), { headers: this.headersjson });
  }
  public update(usuario: User): Observable<User> {
    return this.http.put<User>(ACTUALIZAR_USUARIO, usuario, { headers: this.headersjson });
  }
  public updatePassword(newPassword: DtoChangePassword): Observable<User> {
    return this.http.put<User>(CAMBIAR_CONTRASEÑA, newPassword, { headers: this.headersjson });
  }

  public guardarTipoUsuario(usuario: User) {
    if (usuario !== null) {
      localStorage.setItem(TIPOSTORAGE, JSON.stringify(usuario));
    }
  }

  private removerTipoUsuario() {
    localStorage.removeItem(TIPOSTORAGE);
  }

}
