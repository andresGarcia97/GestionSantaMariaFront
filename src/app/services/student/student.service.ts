import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/model/student/student';
import { LISTAR_ESTUDIANTES } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.loginService.token });

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public listAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(LISTAR_ESTUDIANTES, { headers: this.headersjson });
  }
}
