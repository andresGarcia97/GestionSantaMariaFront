import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DATOS_CORRECTOS, DATOS_INVALIDOS } from 'src/app/consts/messages';
import { DtoChangePassword } from 'src/app/model/changePassword/dto-change-password';
import { User } from 'src/app/model/user/user';
import swal from 'sweetalert';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html'
})
export class UpdatePasswordComponent implements OnInit {

  usuario = new User();
  contrasenas = new DtoChangePassword();
  myFormGroup: FormGroup;

  createFormGroup() {
    return new FormGroup({
      nuevaContrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repetirContrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
      viejaContrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  constructor() { }

  ngOnInit() {
    this.myFormGroup = this.createFormGroup();
    console.log(this.myFormGroup.value);
  }

  updatePassword() {
    if (this.myFormGroup.valid) {
      swal({ icon: 'info', title: DATOS_CORRECTOS });
    } else {
      swal({ icon: 'warning', title: DATOS_INVALIDOS });
    }
  }

  convertFormGroupToDtoChanguePassword(form: FormGroup) {
    this.usuario.identificacion = form.get('identificacion').value;
    this.contrasenas.viejaContrasena = form.get('viejaContrasena').value;
    this.contrasenas.nuevaContrasena = form.get('nuevaContrasena').value;
    this.contrasenas.repetirContrasena = form.get('repetirContrasena').value;
  }

}
