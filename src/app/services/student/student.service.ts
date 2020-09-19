import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { Student } from 'src/app/model/student/student';
import { LISTAR_ESTUDIANTES } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private headersText = new HttpHeaders({ 'Content-Type': 'text/plain' });
  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private loginService: LoginService) { }
  public listAllStudents(): Observable< Student[]> {
    let token = this.loginService.token;
    let httpHeaders = new HttpHeaders();
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    httpHeaders.get('Authorization');
    return this.http.get< Student[]>(LISTAR_ESTUDIANTES);
  }
}
