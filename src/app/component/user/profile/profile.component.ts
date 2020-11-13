import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERRROR_CAMBIO_CONTRASENA, ERRROR_VISUALIZACION_PERFIL, EXITO_CAMBIO_CONTRASENA, VERIFACION_DE_CAMPOS } from 'src/app/consts/messages';
import { TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { DtoChangePassword } from 'src/app/model/changePassword/dto-change-password';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: User;
  contrasenas: DtoChangePassword = new DtoChangePassword();

  constructor(private userService: UserService, private router: Router) { }

  async ngOnInit() {
    this.resetInputs();
    this.user = await JSON.parse(localStorage.getItem(TIPOSTORAGE));
    if (this.user !== null) {
      this.contrasenas.identificacion = this.user.identificacion;
    }
    else {
      swal({ icon: 'error', title: ERRROR_VISUALIZACION_PERFIL });
      this.router.navigate(['/menu']);
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
