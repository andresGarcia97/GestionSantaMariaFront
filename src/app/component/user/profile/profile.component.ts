import { Component, OnInit } from '@angular/core';
import { ERRROR_CAMBIO_CONTRASENA, ERRROR_VISUALIZACION_PERFIL, VERIFICAR_CONTRASENA } from 'src/app/consts/messages';
import { TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { DtoChangePassword } from 'src/app/model/changePassword/dto-change-password';
import { Student } from 'src/app/model/student/student';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: Student;
  contrasenas: DtoChangePassword = new DtoChangePassword();

  constructor(private userService: UserService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(TIPOSTORAGE));
    if (this.user === null) {
      this.user = this.loginService.user as Student;
      this.userService.getUsuario(this.user).subscribe(data => {
        this.user = data as Student;
        this.contrasenas.identificacion = this.user.identificacion;
      }, () => {
        alert(ERRROR_VISUALIZACION_PERFIL);
      }
      );
    }
    else {
      this.contrasenas.identificacion = this.user.identificacion;
    }
  }

  receiveUpdate(){
    this.ngOnInit();
  }

  updatePassword() {
    if (this.contrasenaValida(this.contrasenas)) {
      this.userService.updatePassword(this.contrasenas).subscribe(
        () => {
        }, () => {
          alert(ERRROR_CAMBIO_CONTRASENA);
        }
      );
    }
    else { alert(VERIFICAR_CONTRASENA); }
  }

  contrasenaValida(contrasena: DtoChangePassword): boolean {
    return ((contrasena.nuevaContrasena === contrasena.repetirContrasena) && contrasena.nuevaContrasena.length >= 6);
  }
}
