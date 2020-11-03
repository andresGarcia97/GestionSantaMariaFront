import { Course } from './../../model/course/course';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';
import { LOCALHOST } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

const ENDPOINT_MATERIA = LOCALHOST.concat('materia/');
const LISTAR_MATERIA = ENDPOINT_MATERIA.concat('listarmaterias');
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json' , Authorization: 'Bearer ' + this.loginService.token});
  constructor(private http: HttpClient, private loginService: LoginService) { }

  public listAllMateriasUsuarioLogueado(usuario: User): Observable<Course[]> {
    return this.http.post<Course[]>(LISTAR_MATERIA, usuario, { headers: this.headersjson});
  }
}
