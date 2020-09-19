import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { DtoChangePassword } from 'src/app/model/changePassword/dto-change-password';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  usuario = new User();
  contrasenas = new DtoChangePassword();
  myFormGroup: FormGroup;

  createFormGroup(){
    return new FormGroup({
      nombre: new FormControl('', Validators.required),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
      nuevaContrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repetirContrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
      viejaContrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  constructor(private usuarioService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.myFormGroup = this.createFormGroup();
    console.log(this.myFormGroup.value);
  }
  showPopup(tipoUsuario: string ) {
  //  this.usuario.tipoUsuario = tipoUsuario;
  }
  updatePassword() {
    if (this.myFormGroup.valid) {
      alert('Datos correctos');
    } else {
      alert('Datos invalidos');
    }
  }
  convertFormGroupToDtoChanguePassword(form: FormGroup) {
    this.usuario.identificacion = form.get('identificacion').value;
    this.contrasenas.viejaContrasena = form.get('viejaContrasena').value;
    this.contrasenas.nuevaContrasena = form.get('nuevaContrasena').value;
    this.contrasenas.repetirContrasena = form.get('repetirContrasena').value;
  }


}
