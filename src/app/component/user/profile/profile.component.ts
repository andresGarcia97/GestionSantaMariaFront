import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERRROR_CAMBIO_CONTRASENA, ERRROR_VISUALIZACION_PERFIL, EXITO_CAMBIO_CONTRASENA, NO_SE_PUDO_CARGAR_FIRMA, NO_TIENE_FIRMA, 
  VERIFACION_DE_CAMPOS } from 'src/app/consts/messages';
import { FIRMASTORAGE, TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { DtoChangePassword } from 'src/app/model/changePassword/dto-change-password';
import { Student } from 'src/app/model/student/student';
import { User } from 'src/app/model/user/user';
import { StudentService } from 'src/app/services/student/student.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: User;
  contrasenas: DtoChangePassword = new DtoChangePassword();
  tipoEstudiante = false;
  base64Image: any;
  imagenString: Student;
  tieneFirma = false;

  constructor(private userService: UserService, private router: Router,
    private utilService: UtilService, private studentService: StudentService) { }

  async ngOnInit() {
    this.user = await JSON.parse(localStorage.getItem(TIPOSTORAGE));
    this.tipoEstudiante = this.utilService.isEstudent(this.user);
    this.imagenString = JSON.parse(localStorage.getItem(FIRMASTORAGE));
    if (this.user !== null) {
      this.contrasenas.identificacion = this.user.identificacion;
      if (this.imagenString === null && this.tipoEstudiante) {
        await this.studentService.getEstudiante(this.user);
      }
      this.resetInputs();
      this.cargarImagen();
    }
    else {
      swal({ icon: 'error', title: ERRROR_VISUALIZACION_PERFIL });
      this.router.navigate(['/menu']);
    }
  }

  async cargarImagen() {
    if (this.tipoEstudiante) {
      this.imagenString = JSON.parse(localStorage.getItem(FIRMASTORAGE));
      if (this.imagenString === null) {
        swal({ icon: 'warning', title: NO_SE_PUDO_CARGAR_FIRMA });
      }
      else if (this.imagenString.firma === '') {
        swal({ icon: 'warning', title: NO_TIENE_FIRMA });
      }
      else {
        this.tieneFirma = true;
        this.base64Image = new Image();
        this.base64Image = 'data:image/jpeg;base64,' + this.imagenString.firma;
      }
    }
  }

  receiveUpdate() {
    this.ngOnInit();
  }

  resetInputs() {
    this.contrasenas.nuevaContrasena = '';
    this.contrasenas.repetirContrasena = '';
    this.contrasenas.viejaContrasena = '';
  }

  updatePassword() {
    if (this.contrasenaValida()) {
      this.userService.updatePassword(this.contrasenas).subscribe(() => {
        swal({ icon: 'error', title: EXITO_CAMBIO_CONTRASENA });
      }, () => {
        swal({ icon: 'error', title: ERRROR_CAMBIO_CONTRASENA });
      });
    }
    else {
      swal({ icon: 'error', title: VERIFACION_DE_CAMPOS });
    }
    this.resetInputs();
  }

  contrasenaValida(): boolean {
    return (this.contrasenas.nuevaContrasena !== '' && this.contrasenas.repetirContrasena !== '' &&
      this.contrasenas.viejaContrasena !== '' && this.contrasenas.nuevaContrasena.length >= 6 &&
      (this.contrasenas.nuevaContrasena === this.contrasenas.repetirContrasena));
  }
}
