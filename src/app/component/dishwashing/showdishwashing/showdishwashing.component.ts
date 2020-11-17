import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ACTUALIZACION_HORARIO_ERRONEO, ACTUALIZACION_HORARIO_EXITOSO, ELEMINAR_HORARIO_ERRONEO, ELIMINAR_HORARIO_EXITOSO, El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO,
  HORARIO_SIN_MODIFICAR
} from 'src/app/consts/messages';
import { TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { Student } from 'src/app/model/student/student';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';
import swal from 'sweetalert';
import { Dishwasher } from './../../../model/dishwasher/dishwasher';
import { Dataservice } from './../../../model/util/dataservice';
import { DishwasherService } from './../../../services/dishwasher/dishwasher.service';

const RUTALAVADOlOZA = '/lavado_loza';

@Component({
  selector: 'app-showdishwashing',
  templateUrl: './showdishwashing.component.html'
})
export class ShowdishwashingComponent implements OnInit {

  usuarios: User[] = [];
  administradores: User[];
  dias: string[];
  turnos: string[];
  selectedDay: string;
  selectedTurn: string;
  selectedUser: User = new User();
  selectHorario: Dishwasher = new Dishwasher();
  indice: number;
  horariosLozaDesayuno: Dishwasher[] = new Dishwasher()[7];
  horariosLozaAlmuerzo: Dishwasher[] = new Dishwasher()[7];
  horariosLozaCena: Dishwasher[] = new Dishwasher()[7];
  horariosLoza: Dishwasher[] = [];
  nuevoHorariosLoza: Dishwasher[] = [];
  horarioNuevo: Dishwasher;
  dataservice: Dataservice;
  tipoEstudiante = false;
  user: Student;

  constructor(private userService: UserService, private dishwasherService: DishwasherService,
              private router: Router, private utilService: UtilService) { }

  showPopup(user: User) {
    this.selectedUser = user;
  }
  horarioSeleccionado(horarioSeleccionado: Dishwasher, indice: number){
    this.selectHorario = horarioSeleccionado;
    this.indice = indice;
  }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(TIPOSTORAGE));
    this.tipoEstudiante = this.utilService.isEstudent(this.user);
    if (!this.tipoEstudiante) {
      this.userService.listAllStudents().subscribe(
        (usuarios) => {
          this.usuarios = usuarios;
        }
      );
    }
    this.dataservice = new Dataservice();
    this.dias = this.dataservice.getDias();
    this.turnos = this.dataservice.getTurnos();
    this.horariosLozaDesayuno = [];
    this.horariosLozaAlmuerzo = [];
    this.horariosLozaCena = [];
    this.dishwasherService.getHorariosLoza().subscribe(
      (horariosLoza) => {
        this.horariosLoza = horariosLoza;
        horariosLoza.forEach(element => {
          element.estudiantes.forEach(estudiante => {
            this.asignarHorarioLoza(estudiante, element.turno, element.dia);
          });
        });
        this.nuevoHorariosLoza = [];
      }
    );
  }

  asignarHorarioLoza(selectedUser: User, selectedTurn: string, selectedDay: string) {
    this.horarioNuevo = new Dishwasher();
    if (this.turnos[0] === selectedTurn) {
      if (selectedDay === this.dias[0]) {
        if (this.horariosLozaDesayuno[0] == null) {
          this.horariosLozaDesayuno[0] = new Dishwasher();
          this.horariosLozaDesayuno[0].dia = this.dias[0];
          this.horariosLozaDesayuno[0].turno = this.turnos[0];
          this.horariosLozaDesayuno[0].estudiantes = [];
          this.horariosLozaDesayuno[0].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaDesayuno[0]);
        }
        else {
          if (this.horariosLozaDesayuno[0].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaDesayuno[0].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaDesayuno[0])) {
              this.horarioNuevo.dia = this.dias[0];
              this.horarioNuevo.turno = this.turnos[0];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[1]) {
        if (this.horariosLozaDesayuno[1] == null) {
          this.horariosLozaDesayuno[1] = new Dishwasher();
          this.horariosLozaDesayuno[1].dia = this.dias[1];
          this.horariosLozaDesayuno[1].turno = this.turnos[0];
          this.horariosLozaDesayuno[1].estudiantes = [];
          this.horariosLozaDesayuno[1].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaDesayuno[1]);
        }
        else {
          if (this.horariosLozaDesayuno[1].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaDesayuno[1].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaDesayuno[1])) {
              this.horarioNuevo.dia = this.dias[1];
              this.horarioNuevo.turno = this.turnos[0];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[2]) {
        if (this.horariosLozaDesayuno[2] == null) {
          this.horariosLozaDesayuno[2] = new Dishwasher();
          this.horariosLozaDesayuno[2].dia = this.dias[2];
          this.horariosLozaDesayuno[2].turno = this.turnos[0];
          this.horariosLozaDesayuno[2].estudiantes = [];
          this.horariosLozaDesayuno[2].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaDesayuno[2]);
        }
        else {
          if (this.horariosLozaDesayuno[2].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaDesayuno[2].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaDesayuno[2])) {
              this.horarioNuevo.dia = this.dias[2];
              this.horarioNuevo.turno = this.turnos[0];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[3]) {
        if (this.horariosLozaDesayuno[3] == null) {
          this.horariosLozaDesayuno[3] = new Dishwasher();
          this.horariosLozaDesayuno[3].dia = this.dias[3];
          this.horariosLozaDesayuno[3].turno = this.turnos[0];
          this.horariosLozaDesayuno[3].estudiantes = [];
          this.horariosLozaDesayuno[3].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaDesayuno[3]);
        }
        else {
          if (this.horariosLozaDesayuno[3].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaDesayuno[3].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaDesayuno[3])) {
              this.horarioNuevo.dia = this.dias[3];
              this.horarioNuevo.turno = this.turnos[0];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[4]) {
        if (this.horariosLozaDesayuno[4] == null) {
          this.horariosLozaDesayuno[4] = new Dishwasher();
          this.horariosLozaDesayuno[4].dia = this.dias[4];
          this.horariosLozaDesayuno[4].turno = this.turnos[0];
          this.horariosLozaDesayuno[4].estudiantes = [];
          this.horariosLozaDesayuno[4].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaDesayuno[4]);
        }
        else {
          if (this.horariosLozaDesayuno[4].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaDesayuno[4].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaDesayuno[4])) {
              this.horarioNuevo.dia = this.dias[4];
              this.horarioNuevo.turno = this.turnos[0];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[5]) {
        if (this.horariosLozaDesayuno[5] == null) {
          this.horariosLozaDesayuno[5] = new Dishwasher();
          this.horariosLozaDesayuno[5].dia = this.dias[5];
          this.horariosLozaDesayuno[5].turno = this.turnos[0];
          this.horariosLozaDesayuno[5].estudiantes = [];
          this.horariosLozaDesayuno[5].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaDesayuno[5]);
        }
        else {
          if (this.horariosLozaDesayuno[5].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaDesayuno[5].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaDesayuno[5])) {
              this.horarioNuevo.dia = this.dias[5];
              this.horarioNuevo.turno = this.turnos[0];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[6]) {
        if (this.horariosLozaDesayuno[6] == null) {
          this.horariosLozaDesayuno[6] = new Dishwasher();
          this.horariosLozaDesayuno[6].dia = this.dias[6];
          this.horariosLozaDesayuno[6].turno = this.turnos[0];
          this.horariosLozaDesayuno[6].estudiantes = [];
          this.horariosLozaDesayuno[6].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaDesayuno[6]);
        }
        else {
          if (this.horariosLozaDesayuno[6].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaDesayuno[6].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaDesayuno[6])) {
              this.horarioNuevo.dia = this.dias[6];
              this.horarioNuevo.turno = this.turnos[0];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
    }
    else if (this.turnos[1] === selectedTurn) {
      if (this.selectedDay === this.dias[0]) {
        if (this.horariosLozaAlmuerzo[0] == null) {
          this.horariosLozaAlmuerzo[0] = new Dishwasher();
          this.horariosLozaAlmuerzo[0].dia = this.dias[0];
          this.horariosLozaAlmuerzo[0].turno = this.turnos[1];
          this.horariosLozaAlmuerzo[0].estudiantes = [];
          this.horariosLozaAlmuerzo[0].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaAlmuerzo[0]);
        }
        else {
          if (this.horariosLozaAlmuerzo[0].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaAlmuerzo[0].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaAlmuerzo[0])) {
              this.horarioNuevo.dia = this.dias[0];
              this.horarioNuevo.turno = this.turnos[1];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[1]) {
        if (this.horariosLozaAlmuerzo[1] == null) {
          this.horariosLozaAlmuerzo[1] = new Dishwasher();
          this.horariosLozaAlmuerzo[1].dia = this.dias[1];
          this.horariosLozaAlmuerzo[1].turno = this.turnos[1];
          this.horariosLozaAlmuerzo[1].estudiantes = [];
          this.horariosLozaAlmuerzo[1].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaAlmuerzo[1]);
        }
        else {
          if (this.horariosLozaAlmuerzo[1].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaAlmuerzo[1].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaAlmuerzo[1])) {
              this.horarioNuevo.dia = this.dias[1];
              this.horarioNuevo.turno = this.turnos[1];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[2]) {
        if (this.horariosLozaAlmuerzo[2] == null) {
          this.horariosLozaAlmuerzo[2] = new Dishwasher();
          this.horariosLozaAlmuerzo[2].dia = this.dias[2];
          this.horariosLozaAlmuerzo[2].turno = this.turnos[1];
          this.horariosLozaAlmuerzo[2].estudiantes = [];
          this.horariosLozaAlmuerzo[2].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaAlmuerzo[2]);
        }
        else {
          if (this.horariosLozaAlmuerzo[2].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaAlmuerzo[2].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaAlmuerzo[2])) {
              this.horarioNuevo.dia = this.dias[2];
              this.horarioNuevo.turno = this.turnos[1];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[3]) {
        if (this.horariosLozaAlmuerzo[3] == null) {
          this.horariosLozaAlmuerzo[3] = new Dishwasher();
          this.horariosLozaAlmuerzo[3].dia = this.dias[3];
          this.horariosLozaAlmuerzo[3].turno = this.turnos[1];
          this.horariosLozaAlmuerzo[3].estudiantes = [];
          this.horariosLozaAlmuerzo[3].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaAlmuerzo[3]);
        }
        else {
          if (this.horariosLozaAlmuerzo[3].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaAlmuerzo[3].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaAlmuerzo[3])) {
              this.horarioNuevo.dia = this.dias[3];
              this.horarioNuevo.turno = this.turnos[1];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[4]) {
        if (this.horariosLozaAlmuerzo[4] == null) {
          this.horariosLozaAlmuerzo[4] = new Dishwasher();
          this.horariosLozaAlmuerzo[4].dia = this.dias[4];
          this.horariosLozaAlmuerzo[4].turno = this.turnos[1];
          this.horariosLozaAlmuerzo[4].estudiantes = [];
          this.horariosLozaAlmuerzo[4].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaAlmuerzo[4]);
        }
        else {
          if (this.horariosLozaAlmuerzo[4].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaAlmuerzo[4].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaAlmuerzo[4])) {
              this.horarioNuevo.dia = this.dias[4];
              this.horarioNuevo.turno = this.turnos[1];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[5]) {
        if (this.horariosLozaAlmuerzo[5] == null) {
          this.horariosLozaAlmuerzo[5] = new Dishwasher();
          this.horariosLozaAlmuerzo[5].dia = this.dias[5];
          this.horariosLozaAlmuerzo[5].turno = this.turnos[1];
          this.horariosLozaAlmuerzo[5].estudiantes = [];
          this.horariosLozaAlmuerzo[5].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaAlmuerzo[5]);
        }
        else {
          if (this.horariosLozaAlmuerzo[5].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaAlmuerzo[5].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaAlmuerzo[5])) {
              this.horarioNuevo.dia = this.dias[5];
              this.horarioNuevo.turno = this.turnos[1];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[6]) {
        if (this.horariosLozaAlmuerzo[6] == null) {
          this.horariosLozaAlmuerzo[6] = new Dishwasher();
          this.horariosLozaAlmuerzo[6].dia = this.dias[6];
          this.horariosLozaAlmuerzo[6].turno = this.turnos[1];
          this.horariosLozaAlmuerzo[6].estudiantes = [];
          this.horariosLozaAlmuerzo[6].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaAlmuerzo[6]);
        }
        else {
          if (this.horariosLozaAlmuerzo[6].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaAlmuerzo[6].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaAlmuerzo[6])) {
              this.horarioNuevo.dia = this.dias[6];
              this.horarioNuevo.turno = this.turnos[1];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
    }
    else if (this.turnos[2] === selectedTurn) {
      if (selectedDay === this.dias[0]) {
        if (this.horariosLozaCena[0] == null) {
          this.horariosLozaCena[0] = new Dishwasher();
          this.horariosLozaCena[0].dia = this.dias[0];
          this.horariosLozaCena[0].turno = this.turnos[2];
          this.horariosLozaCena[0].estudiantes = [];
          this.horariosLozaCena[0].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaCena[0]);
        }
        else {
          if (this.horariosLozaCena[0].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaCena[0].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaCena[0])) {
              this.horarioNuevo.dia = this.dias[0];
              this.horarioNuevo.turno = this.turnos[2];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[1]) {
        if (this.horariosLozaCena[1] == null) {
          this.horariosLozaCena[1] = new Dishwasher();
          this.horariosLozaCena[1].dia = this.dias[1];
          this.horariosLozaCena[1].turno = this.turnos[2];
          this.horariosLozaCena[1].estudiantes = [];
          this.horariosLozaCena[1].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaCena[1]);
        }
        else {
          if (this.horariosLozaCena[1].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaCena[1].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaCena[1])) {
              this.horarioNuevo.dia = this.dias[1];
              this.horarioNuevo.turno = this.turnos[2];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[2]) {
        if (this.horariosLozaCena[2] == null) {
          this.horariosLozaCena[2] = new Dishwasher();
          this.horariosLozaCena[2].dia = this.dias[2];
          this.horariosLozaCena[2].turno = this.turnos[2];
          this.horariosLozaCena[2].estudiantes = [];
          this.horariosLozaCena[2].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaCena[2]);
        }
        else {
          if (this.horariosLozaCena[2].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaCena[2].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaCena[2])) {
              this.horarioNuevo.dia = this.dias[2];
              this.horarioNuevo.turno = this.turnos[2];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[3]) {
        if (this.horariosLozaCena[3] == null) {
          this.horariosLozaCena[3] = new Dishwasher();
          this.horariosLozaCena[3].dia = this.dias[3];
          this.horariosLozaCena[3].turno = this.turnos[2];
          this.horariosLozaCena[3].estudiantes = [];
          this.horariosLozaCena[3].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaCena[3]);
        }
        else {
          if (this.horariosLozaCena[3].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaCena[3].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaCena[3])) {
              this.horarioNuevo.dia = this.dias[3];
              this.horarioNuevo.turno = this.turnos[2];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[4]) {
        if (this.horariosLozaCena[4] == null) {
          this.horariosLozaCena[4] = new Dishwasher();
          this.horariosLozaCena[4].dia = this.dias[4];
          this.horariosLozaCena[4].turno = this.turnos[2];
          this.horariosLozaCena[4].estudiantes = [];
          this.horariosLozaCena[4].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaCena[4]);
        }
        else {
          if (this.horariosLozaCena[4].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaCena[4].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaCena[4])) {
              this.horarioNuevo.dia = this.dias[4];
              this.horarioNuevo.turno = this.turnos[2];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[5]) {
        if (this.horariosLozaCena[5] == null) {
          this.horariosLozaCena[5] = new Dishwasher();
          this.horariosLozaCena[5].dia = this.dias[5];
          this.horariosLozaCena[5].turno = this.turnos[2];
          this.horariosLozaCena[5].estudiantes = [];
          this.horariosLozaCena[5].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaCena[5]);
        }
        else {
          if (this.horariosLozaCena[5].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaCena[5].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaCena[5])) {
              this.horarioNuevo.dia = this.dias[5];
              this.horarioNuevo.turno = this.turnos[2];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
      else if (selectedDay === this.dias[6]) {
        if (this.horariosLozaCena[6] == null) {
          this.horariosLozaCena[6] = new Dishwasher();
          this.horariosLozaCena[6].dia = this.dias[6];
          this.horariosLozaCena[6].turno = this.turnos[2];
          this.horariosLozaCena[6].estudiantes = [];
          this.horariosLozaCena[6].estudiantes.push(selectedUser);
          this.nuevoHorariosLoza.push(this.horariosLozaCena[6]);
        }
        else {
          if (this.horariosLozaCena[6].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaCena[6].estudiantes.push(selectedUser);
            if (!this.nuevoHorariosLoza.includes(this.horariosLozaCena[6])) {
              this.horarioNuevo.dia = this.dias[6];
              this.horarioNuevo.turno = this.turnos[2];
              this.horarioNuevo.estudiantes = [];
              this.horarioNuevo.estudiantes.push(selectedUser);
              this.nuevoHorariosLoza.push(this.horarioNuevo);
            }
          } else {
            swal({ icon: 'warning', title: El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO });
          }
        }
      }
    }
  }

  crearHorario() {
    if (this.horariosLoza.length === 0) {
      (this.horariosLozaDesayuno.concat(this.horariosLozaAlmuerzo, this.horariosLozaCena)).forEach(horario => {
        if (!(horario == null || typeof horario === 'undefined')) {
          this.horariosLoza.push(horario);
        }
      });
      if (this.horariosLoza.length > 0) {
        this.agregarHorarionuevo(this.horariosLoza);
      }
    }
    else {
      if (this.nuevoHorariosLoza.length > 0) {
        this.agregarHorarionuevo(this.nuevoHorariosLoza);
      } else {
        swal({ icon: 'error', title: HORARIO_SIN_MODIFICAR });
      }
    }
    this.nuevoHorariosLoza = [];
  }

  agregarHorarionuevo(horariosLoza: Dishwasher[]) {
    this.dishwasherService.guardarHorario(horariosLoza)
      .subscribe(() => {
        this.router.navigate([RUTALAVADOlOZA]);
        swal({ icon: 'success', title: ACTUALIZACION_HORARIO_EXITOSO });
      }, () => {
        swal({ icon: 'error', title: ACTUALIZACION_HORARIO_ERRONEO });
      });
  }
  quitarEstudiante(user: User){
    let horarioActualizado = new Dishwasher();
    horarioActualizado = JSON.parse(JSON.stringify(this.selectHorario));
    horarioActualizado.estudiantes = [];
    this.nuevoHorariosLoza = [];
    horarioActualizado.estudiantes.push(user);
    if (this.selectHorario.turno === this.turnos[0]){
      this.eliminarObjetoArray(this.horariosLozaDesayuno[this.indice].estudiantes, user);
    }
    else if (this.selectHorario.turno === this.turnos[1]){
      this.eliminarObjetoArray(this.horariosLozaAlmuerzo[this.indice].estudiantes, user);
    }
    else{
      this.eliminarObjetoArray(this.horariosLozaCena[this.indice].estudiantes, user);
    }
    this.dishwasherService.delete(horarioActualizado).subscribe( async () => {
    }, () => {
      swal({ icon: 'error', title: ACTUALIZACION_HORARIO_ERRONEO });
    });
  }
  deleteHorario(){
    if (this.selectHorario.turno === this.turnos[0]){
      this.eliminarObjetoArray(this.nuevoHorariosLoza, this.horariosLozaDesayuno[this.indice]);
      this.horariosLozaDesayuno[this.indice] = null;
    }
    else if (this.selectHorario.turno === this.turnos[1]){
      this.eliminarObjetoArray(this.nuevoHorariosLoza, this.horariosLozaAlmuerzo[this.indice]);
      this.horariosLozaAlmuerzo[this.indice] = null;
    }
    else{
      this.eliminarObjetoArray(this.nuevoHorariosLoza, this.horariosLozaCena[this.indice]);
      this.horariosLozaCena[this.indice] = null;
    }

    this.dishwasherService.delete(this.selectHorario).subscribe( async () => {
      swal({ icon: 'success', title: ELIMINAR_HORARIO_EXITOSO });
      this.router.navigate([RUTALAVADOlOZA]);
    }, () => {
      swal({ icon: 'error', title: ELEMINAR_HORARIO_ERRONEO });
    });
  }
  eliminarObjetoArray( array, objeto ) {
    const i = array.indexOf( objeto );
    if ( i !== -1 ) {
      array.splice( i, 1 );
    }
}
}
