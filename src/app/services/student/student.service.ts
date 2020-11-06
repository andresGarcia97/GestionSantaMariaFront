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
  /*
  private headersText = new HttpHeaders({ 'Content-Type': 'text/plain' });
  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json' });
  */
  constructor(private http: HttpClient, private loginService: LoginService) { }
  public listAllStudents(): Observable<Student[]> {
    const token = this.loginService.token;
    let httpHeaders = new HttpHeaders();
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', token);
    }
    httpHeaders.get('Authorization');
    return this.http.get<Student[]>(LISTAR_ESTUDIANTES);
  }
}
