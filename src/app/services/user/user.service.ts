import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { DtoChangePassword } from 'src/app/model/changePassword/dto-change-password';
import { Student } from 'src/app/model/student/student';
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
  private tipo: string;

  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.loginService.token });

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public get tipoUsuario(): string {
    if (this.tipo != null) {
      return this.tipo;
    } else if (this.tipo == null && localStorage.getItem(TIPOSTORAGE) != null) {
      this.tipo = JSON.parse(localStorage.getItem(TIPOSTORAGE));
      return this.tipo;
    }
    return null;
  }

  public listAllStudents(): Observable<User[]> {
    return this.http.get<User[]>(LISTAR_ESTUDIANTES, { headers: this.headersjson });
  }
  public listAllAdmins(): Observable<User[]> {
    return this.http.get<User[]>(LISTAR_ADMINISTRADORES, { headers: this.headersjson });
  }
  public getAdministrador(): Observable<User[]> {
    return this.http.get<User[]>(LISTAR_ADMINISTRADORES, { headers: this.headersjson });
  }
  public getUsuario(usuario: Student): Observable<Student> {
    return this.http.post<Student>(BUSCAR_USUARIO, usuario, { headers: this.headersjson });
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
  public update(usuario: Student): Observable<Student> {
    return this.http.put<Student>(ACTUALIZAR_USUARIO, usuario, { headers: this.headersjson });
  }
  public updatePassword(newPassword: DtoChangePassword): Observable<User> {
    return this.http.put<User>(CAMBIAR_CONTRASEÑA, newPassword, { headers: this.headersjson });
  }

  public guardarTipoUsuario(usuario: Student) {
    if (usuario !== null) {
      localStorage.setItem(TIPOSTORAGE, JSON.stringify(usuario));
    }
  }

}
