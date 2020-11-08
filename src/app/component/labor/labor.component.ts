import { Component, OnInit } from '@angular/core';
import { INGRESO_ERRONEO_LABOR, INGRESO_EXITOSO_LABOR, VERIFACION_DE_CAMPOS } from 'src/app/consts/messages';
import { TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { Student } from 'src/app/model/student/student';
import { User } from 'src/app/model/user/user';
import { LaborService } from 'src/app/services/labor/labor.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';
import { Labor } from './../../model/labor/labor';

@Component({
  selector: 'app-labor',
  templateUrl: './labor.component.html',
  styleUrls: ['./labor.component.css']
})
export class LaborComponent implements OnInit {
  usuarios: User[] = [];
  selectedUser: User = new User();
  espacio: string;
  descripcion: string;
  frecuencia: string;
  labores: Labor[] = [];
  labor: Labor;
  usuarioSeleccionado = false;
  user: User = new User();
  tipoUsuario = false;

  constructor(private userService: UserService, private utilService: UtilService, private laborService: LaborService) { }

  showPopup(user: User) {
    this.selectedUser = user;
    this.usuarioSeleccionado = true;
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(TIPOSTORAGE)) as User;
    this.tipoUsuario = this.utilService.isEstudent(this.user as Student);
    this.laborService.getReservas().subscribe(
      (labores) => {
        this.labores = labores;
      }
    );
    this.userService.listAllStudents().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      }
    );
  }

  usuarioValido(user: User): boolean {
    return (user.nombre === '' || user.apellido === '' || user.telefono === null || user.correo === '');
  }

  asignarlabor(selectedUser: User, espacio: string, descripcion: string, frecuencia: string) {
    if (espacio !== '' && descripcion !== '' && frecuencia !== '') {
      this.labor = new Labor();
      this.labor.estudianteLabor = selectedUser as Student;
      this.labor.espacio = espacio;
      this.labor.descripcion = descripcion;
      this.labor.frecuencia = frecuencia;
      this.laborService.guardarLabor(this.labor).subscribe(() => {
        this.labores.push(this.labor);
        alert(INGRESO_EXITOSO_LABOR);
      }, () => {
        alert(INGRESO_ERRONEO_LABOR);
      });
    }
    else {
      alert(VERIFACION_DE_CAMPOS);
    }
    console.log(this.labores);
  }

}
