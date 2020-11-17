import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ERRROR_CONSULTAR_PERFIL, LOGIN_INCORRECTO, TIPO_DE_USUARIO } from 'src/app/consts/messages';
import { IDENTIFICACIONSTORAGE, TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { User } from 'src/app/model/user/user';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';
import swal from 'sweetalert';
import { UtilService } from './../../../services/util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: User;
  myFormGroup: FormGroup;
  messageBoolean: boolean;
  passwordType = 'password';
  hiddenPassword = false;

  createFormGroup() {
    return new FormGroup({
      identificacion: new FormControl('', Validators.required),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  constructor(private loginService: LoginService, private router: Router,
    private util: UtilService, private userService: UserService) { }

  ngOnInit(): void {
    this.usuario = new User();
    this.myFormGroup = this.createFormGroup();
    this.util.currentBooleanMessage.subscribe(messageBoolean => this.messageBoolean = messageBoolean);
  }

  async login() {
    if (this.myFormGroup.valid) {
      this.convertFormGroupToUser(this.myFormGroup);
      await this.loginService.login(this.usuario);
      this.usuario = await JSON.parse(localStorage.getItem(IDENTIFICACIONSTORAGE)) as User;
      if (this.usuario === null) {
        this.usuario = new User();
        swal({ icon: 'error', title: LOGIN_INCORRECTO });
      }
      else {
        await this.userService.getUsuario(this.usuario);
        this.usuario = await JSON.parse(localStorage.getItem(TIPOSTORAGE)) as User;
        if (this.usuario !== null) {
          this.util.changeBooleanMessage(true);
          swal({
            icon: 'success',
            title: 'Bienvenido,  '.concat(this.usuario.nombre).concat('  ').concat(TIPO_DE_USUARIO.concat(this.usuario.tipoUsuario))
          });
          this.router.navigate(['/menu']);
        }
        else {
          this.usuario = new User();
          swal({ icon: 'warning', title: ERRROR_CONSULTAR_PERFIL });
          this.loginService.logout();
        }
      }
    }
  }

  ocultarContrasena() {
    if (this.hiddenPassword) {
      this.hiddenPassword = false;
      this.passwordType = 'password';
    }
    else {
      this.hiddenPassword = true;
      this.passwordType = 'text';
    }
  }

  convertFormGroupToUser(form: FormGroup) {
    this.usuario.identificacion = form.get('identificacion').value;
    this.usuario.contrasena = form.get('contrasena').value;
  }
}
