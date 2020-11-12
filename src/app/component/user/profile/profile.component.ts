import { Component, OnInit } from '@angular/core';
import { ERRROR_CAMBIO_CONTRASENA, ERRROR_VISUALIZACION_PERFIL, VERIFICAR_CONTRASENA } from 'src/app/consts/messages';
import { IDENTIFICACIONSTORAGE, TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { DtoChangePassword } from 'src/app/model/changePassword/dto-change-password';
import { Student } from 'src/app/model/student/student';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: Student;
  contrasenas: DtoChangePassword = new DtoChangePassword();

  constructor(private userService: UserService, private loginService: LoginService) { }

  async ngOnInit() {
    this.user = await JSON.parse(localStorage.getItem(TIPOSTORAGE));
    if (this.user === null) {
      this.user = JSON.parse(localStorage.getItem(IDENTIFICACIONSTORAGE)) as Student;
      this.userService.getUsuario(this.user).subscribe(data => {
        this.user = data as Student;
        this.contrasenas.identificacion = this.user.identificacion;
      }, () => {
        swal({ icon: 'error', title: ERRROR_VISUALIZACION_PERFIL });
      });
    }
    else {
      this.contrasenas.identificacion = this.user.identificacion;
    }
  }

  receiveUpdate() {
    this.ngOnInit();
  }

  updatePassword() {
    if (this.contrasenaValida(this.contrasenas)) {
      this.userService.updatePassword(this.contrasenas).subscribe(() => {
      }, () => {
        swal({ icon: 'error', title: ERRROR_CAMBIO_CONTRASENA });
      });
    }
    else {
      swal({ icon: 'error', title: VERIFICAR_CONTRASENA });
    }
  }

  contrasenaValida(contrasena: DtoChangePassword): boolean {
    return ((contrasena.nuevaContrasena === contrasena.repetirContrasena) && contrasena.nuevaContrasena.length >= 6);
  }
}
