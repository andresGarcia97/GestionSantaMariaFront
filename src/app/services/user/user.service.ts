import { DtoChangePassword } from 'src/app/model/changePassword/dto-change-password';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';
import { LISTAR_ESTUDIANTES, LISTAR_ADMINISTRADORES, INSERTAR_ADMINISTRADOR,
  INSERTAR_ESTUDIANTE, ELIMINAR_USUARIO, ACTUALIZAR_USUARIO, BUSCAR_USUARIO, CAMBIAR_CONTRASEÑA } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headersText = new HttpHeaders({ 'Content-Type': 'text/plain' });
  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json' , Authorization: 'Bearer ' + this.loginService.token});

  constructor(private http: HttpClient, private loginService: LoginService) { }
  public listAllStudents(): Observable<User[]> {
    return this.http.get<User[]>(LISTAR_ESTUDIANTES, { headers: this.headersjson});
  }
  public listAllAdmins(): Observable<User[]> {
    return this.http.get<User[]>(LISTAR_ADMINISTRADORES, { headers: this.headersjson});
  }
  public getAdministrador(): Observable<User[]> {
    return this.http.get<User[]>(LISTAR_ADMINISTRADORES, { headers: this.headersjson});
  }
  public getUsuario(usuario: User): Observable<User[]> {
    return this.http.post<User[]>(BUSCAR_USUARIO, usuario, { headers: this.headersjson});
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
}
