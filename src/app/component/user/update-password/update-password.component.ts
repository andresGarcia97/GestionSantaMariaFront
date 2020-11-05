import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DATOS_CORRECTOS, DATOS_INVALIDOS } from 'src/app/consts/messages';
import { DtoChangePassword } from 'src/app/model/changePassword/dto-change-password';
import { User } from 'src/app/model/user/user';

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
      nombre: new FormControl('', Validators.required),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
      nuevaContrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repetirContrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
      viejaContrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  constructor() {
  }

  ngOnInit() {
    this.myFormGroup = this.createFormGroup();
    console.log(this.myFormGroup.value);
  }

  updatePassword() {
    if (this.myFormGroup.valid) {
      alert(DATOS_CORRECTOS);
    } else {
      alert(DATOS_INVALIDOS);
    }
  }
  convertFormGroupToDtoChanguePassword(form: FormGroup) {
    this.usuario.identificacion = form.get('identificacion').value;
    this.contrasenas.viejaContrasena = form.get('viejaContrasena').value;
    this.contrasenas.nuevaContrasena = form.get('nuevaContrasena').value;
    this.contrasenas.repetirContrasena = form.get('repetirContrasena').value;
  }

}
