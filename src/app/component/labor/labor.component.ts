import { Component, OnInit } from '@angular/core';
import { VERIFACION_DE_CAMPOS } from 'src/app/consts/messages';
import { IDENTIFICACIONSTORAGE } from 'src/app/consts/StorageKeys';
import { Student } from 'src/app/model/student/student';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';
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
  labores: Labor [] = [];
  labor: Labor;
  constructor(private userService: UserService) { }

  showPopup(user: User) {
    this.selectedUser = user;
  }
  ngOnInit(): void {
    this.userService.listAllStudents().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      }
    );
  }
  usuarioValido(user: User): boolean {
    return (user.nombre === '' || user.apellido === '' || user.telefono === null || user.correo === '');
  }
  asignarlabor(selectedUser: User, espacio: string , descripcion: string, frecuencia: string){
      if (espacio !== '' && descripcion !== '' && frecuencia !== ''){
        this.labor = new Labor();
        this.labor.estudianteLabor = selectedUser as Student;
        this.labor.espacio = espacio;
        this.labor.descripcion = descripcion;
        this.labor.frecuencia = frecuencia;
        this.labores.push(this.labor);
      }
      else{
        alert(VERIFACION_DE_CAMPOS);
      }
      console.log(this.labores);
  }
  showHorarios(identificacion: number){
    localStorage.setItem(IDENTIFICACIONSTORAGE, JSON.stringify(identificacion));
    window.open('mostrarmaterias');
  }
}
