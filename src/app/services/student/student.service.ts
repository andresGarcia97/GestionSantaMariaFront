import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FIRMASTORAGE } from 'src/app/consts/StorageKeys';
import { Student } from 'src/app/model/student/student';
import { User } from 'src/app/model/user/user';
import { LOCALHOST } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

const ENDPOINT_ESTUDIANTE = LOCALHOST.concat('estudiante/');
const LISTAR_FIRMAS = ENDPOINT_ESTUDIANTE.concat('listarfirmas/');
const OBTENER_ESTUDIANTE = ENDPOINT_ESTUDIANTE.concat('buscarestudiante/');

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private headersjson = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.loginService.token });

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public listAllFirms(): Observable<Student[]> {
    return this.http.get<Student[]>(LISTAR_FIRMAS, { headers: this.headersjson });
  }

  public async getEstudiante(estudiante: User) {
    try {
      const data = await this.http.post<Student>(OBTENER_ESTUDIANTE, estudiante, { headers: this.headersjson }).toPromise();
      this.guardarFirma(data);
    } catch (error) {
      this.borrarFirma();
    }
  }

  private guardarFirma(usuario: Student) {
    if (usuario !== null) {
      localStorage.setItem(FIRMASTORAGE, JSON.stringify(usuario));
    }
  }

  private borrarFirma() {
    localStorage.removeItem(FIRMASTORAGE);
  }
}
