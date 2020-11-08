import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ACTUALIZACION_HORARIO_ERRONEO, ACTUALIZACION_HORARIO_EXITOSO, El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO,
  REGISTRO_HORARIO_ERRONEO
} from 'src/app/consts/messages';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';
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
  horariosLozaDesayuno: Dishwasher[] = new Dishwasher()[7];
  horariosLozaAlmuerzo: Dishwasher[] = new Dishwasher()[7];
  horariosLozaCena: Dishwasher[] = new Dishwasher()[7];
  horariosLoza: Dishwasher[] = [];
  dataservice: Dataservice;
  usuarioSeleccionado = false;

  constructor(private userService: UserService, private dishwasherService: DishwasherService, private router: Router) { }

  showPopup(user: User) {
    this.selectedUser = user;
    this.usuarioSeleccionado = true;
  }

  ngOnInit(): void {
    this.userService.listAllStudents().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      }
    );
    this.dataservice = new Dataservice();
    this.dias = this.dataservice.getDias();
    this.turnos = this.dataservice.getTurnos();
    this.horariosLozaDesayuno = [];
    this.horariosLozaAlmuerzo = [];
    this.horariosLozaCena = [];
    this.dishwasherService.getHorariosLoza().subscribe(
      (horariosLoza) => {
        horariosLoza.forEach(element => {
          console.log(element);
          this.selectedTurn = element.turno;
          this.selectedDay = element.dia;
          element.estudiantes.forEach(estudiante => {
            this.asignarHorarioLoza(estudiante, this.selectedTurn, this.selectedDay);
          });
        });
      }
    );
  }
  asignarHorarioLoza(selectedUser: User, selectedTurn: string, selectedDay: string) {
    if (this.turnos[0] === selectedTurn) {
      if (selectedDay === this.dias[0]) {
        if (this.horariosLozaDesayuno[0] == null) {
          this.horariosLozaDesayuno[0] = new Dishwasher();
          this.horariosLozaDesayuno[0].dia = this.dias[0];
          this.horariosLozaDesayuno[0].turno = this.turnos[0];
          this.horariosLozaDesayuno[0].estudiantes = [];
          this.horariosLozaDesayuno[0].estudiantes.push(selectedUser);
        }
        else {
          if (this.horariosLozaDesayuno[0].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaDesayuno[0].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaDesayuno[1].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaDesayuno[1].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaDesayuno[2].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaDesayuno[2].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaDesayuno[3].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaDesayuno[3].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaDesayuno[4].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaDesayuno[4].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaDesayuno[5].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaDesayuno[5].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaDesayuno[6].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaDesayuno[6].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaAlmuerzo[0].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaAlmuerzo[0].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaAlmuerzo[1].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaAlmuerzo[1].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaAlmuerzo[2].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaAlmuerzo[2].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaAlmuerzo[3].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaAlmuerzo[3].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaAlmuerzo[4].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaAlmuerzo[4].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaAlmuerzo[5].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaAlmuerzo[5].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaAlmuerzo[6].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaAlmuerzo[6].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaCena[0].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaCena[0].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaCena[1].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaCena[1].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaCena[2].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaCena[2].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaCena[3].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaCena[3].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaCena[4].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaCena[4].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaCena[5].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaCena[5].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
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
        }
        else {
          if (this.horariosLozaCena[6].estudiantes.findIndex(estudiante =>
            estudiante.identificacion === selectedUser.identificacion) === -1) {
            this.horariosLozaCena[6].estudiantes.push(selectedUser);
          } else {
            alert(El_USUARIO_ESTA_REGISTRADO_EN_TURNO_SELECCIONADO);
          }
        }
      }
    }
  }

  crearHorario() {
    (this.horariosLozaDesayuno.concat(this.horariosLozaAlmuerzo, this.horariosLozaCena)).forEach(horario => {
      if (!(horario == null || typeof horario === 'undefined')) {
        this.horariosLoza.push(horario);
      }
    });
    this.dishwasherService.guardarHorario(this.horariosLoza)
      .subscribe(() => {
        // Entra aquí con respuesta del servicio correcta código http 200
        alert(ACTUALIZACION_HORARIO_EXITOSO);
        this.router.navigate([RUTALAVADOlOZA]);
      }, () => {
        // Entra aquí si el servicio entrega un código http de error EJ: 404, 500
        alert(REGISTRO_HORARIO_ERRONEO);
      });
  }
  crearHorario2(horaloza: Dishwasher) {
    this.horariosLoza = [];
    this.horariosLoza.push(horaloza);
    if (this.horariosLoza === null) {
      this.dishwasherService.guardarHorario(this.horariosLoza)
        .subscribe(() => {
          // Entra aquí con respuesta del servicio correcta código http 200
          alert(ACTUALIZACION_HORARIO_EXITOSO);
          this.router.navigate([RUTALAVADOlOZA]);
        }, () => {
          // Entra aquí si el servicio entrega un código http de error EJ: 404, 500
          alert(ACTUALIZACION_HORARIO_ERRONEO);
        });
    }
  }
  usuarioValido(user: User): boolean {
    return (user.nombre === '' || user.apellido === '' || user.telefono === null || user.correo === '');
  }
}
