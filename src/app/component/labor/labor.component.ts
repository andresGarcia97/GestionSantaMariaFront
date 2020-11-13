import { Component, OnInit } from '@angular/core';
import {
  ANIMALES, AUDITORIO, BLOQUES, BLOQUE_AZUL, COCINA, CULTIVOS, LAVANDERIA, OTRO, SALA_INFORMATICA,
  SALA_TV, SALON3, SALON4, SALON_AMARILLO, ZONAS_VERDES
} from 'src/app/consts/consts';
import {
  ACTUALIZACION_ERRONEO_LABOR, ACTUALIZACION_EXITOSO_LABOR, BORRADO_ERRONEO_LABOR, BORRADO_EXITOSO_LABOR,
  INGRESO_ERRONEO_LABOR, INGRESO_EXITOSO_LABOR, VERIFACION_DE_CAMPOS
} from 'src/app/consts/messages';
import { TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { Student } from 'src/app/model/student/student';
import { User } from 'src/app/model/user/user';
import { LaborService } from 'src/app/services/labor/labor.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';
import swal from 'sweetalert';
import { Labor } from './../../model/labor/labor';

@Component({
  selector: 'app-labor',
  templateUrl: './labor.component.html'
})
export class LaborComponent implements OnInit {
  usuarios: User[] = [];
  selectedUser: User = new User();
  espacio = '';
  descripcion: string;
  frecuencia: string;
  labores: Labor[] = [];
  nuevaLabor: Labor;
  usuarioSeleccionado = false;
  user: User = new User();
  tipoUsuario = false;
  espacioUpdate = '';
  descripcionUpdate: string;
  frecuenciaUpdate: string;
  laborUpdate: Labor = new Labor();
  userUpdate: User = new User();
  lugares = [
    { lugar: SALA_TV }, { lugar: LAVANDERIA }, { lugar: SALA_INFORMATICA }, { lugar: AUDITORIO }, { lugar: SALON_AMARILLO },
    { lugar: SALON4 }, { lugar: SALON3 }, { lugar: ZONAS_VERDES }, { lugar: CULTIVOS }, { lugar: ANIMALES },
    { lugar: COCINA }, { lugar: BLOQUE_AZUL }, { lugar: BLOQUES }, { lugar: OTRO }
  ];

  constructor(private userService: UserService, private utilService: UtilService, private laborService: LaborService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(TIPOSTORAGE)) as User;
    this.tipoUsuario = this.utilService.isEstudent(this.user as Student);
    this.obtenerLabores();
    if (!this.tipoUsuario) {
      this.userService.listAllStudents().subscribe(
        (usuarios) => {
          this.usuarios = usuarios;
        }
      );
    }
  }

  obtenerLabores(): void {
    this.laborService.getLabores().subscribe(
      (labores) => {
        this.labores = labores;
      }
    );
  }

  showPopup(user: User) {
    this.selectedUser = user;
    this.espacio = this.lugares[0].lugar;
    this.usuarioSeleccionado = true;
  }

  asignarlabor(selectedUser: User) {
    if (this.espacio !== '' && this.descripcion !== '' && this.frecuencia !== '') {
      this.nuevaLabor = new Labor();
      this.nuevaLabor.estudianteLabor = selectedUser as User;
      this.nuevaLabor.espacio = this.espacio;
      this.nuevaLabor.descripcion = this.descripcion;
      this.nuevaLabor.frecuencia = this.frecuencia;
      this.laborService.guardarLabor(this.nuevaLabor).subscribe(() => {
        this.labores.push(this.nuevaLabor);
        this.espacio = '';
        this.descripcion = '';
        this.frecuencia = '';
        swal({ icon: 'success', title: INGRESO_EXITOSO_LABOR });
      }, () => {
        swal({ icon: 'error', title: INGRESO_ERRONEO_LABOR });
      });
    }
    else {
      swal({ icon: 'warning', title: VERIFACION_DE_CAMPOS });
    }
  }

  showPopupUpdate(labor: Labor) {
    this.laborUpdate = labor;
    this.userUpdate = labor.estudianteLabor;
    this.espacioUpdate = labor.espacio.valueOf();
    this.descripcionUpdate = labor.descripcion.valueOf();
    this.frecuenciaUpdate = labor.frecuencia.valueOf();
  }

  editarlabor(laborUpdate: Labor) {
    if (this.espacioUpdate !== '' && this.descripcionUpdate !== '' && this.frecuenciaUpdate !== '') {
      this.nuevaLabor = new Labor();
      this.nuevaLabor.estudianteLabor = laborUpdate.estudianteLabor;
      this.nuevaLabor.espacio = this.espacioUpdate;
      this.nuevaLabor.descripcion = this.descripcionUpdate;
      this.nuevaLabor.frecuencia = this.frecuenciaUpdate;
      const labores: Labor[] = [];
      labores.push(laborUpdate);
      labores.push(this.nuevaLabor);
      this.laborService.updateLabor(labores).subscribe(() => {
        this.obtenerLabores();
        this.espacioUpdate = '';
        this.descripcionUpdate = '';
        this.frecuenciaUpdate = '';
        swal({ icon: 'success', title: ACTUALIZACION_EXITOSO_LABOR });
      }, () => {
        swal({ icon: 'error', title: ACTUALIZACION_ERRONEO_LABOR });
      });
    }
    else {
      swal({ icon: 'warning', title: VERIFACION_DE_CAMPOS });
    }
  }

  eliminarlabor(laborUpdate: Labor) {
    this.laborService.deleteLabor(laborUpdate).subscribe(() => {
      this.obtenerLabores();
      swal({ icon: 'success', title: BORRADO_EXITOSO_LABOR });
    }, () => {
      swal({ icon: 'error', title: BORRADO_ERRONEO_LABOR });
    });
  }

}
