import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN_CORRECTO, LOGIN_INCORRECTO } from 'src/app/consts/messages';
import { User } from 'src/app/model/user/user';
import { LoginService } from 'src/app/services/login/login.service';
import swal from 'sweetalert';
import { UtilService } from './../../../services/util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: User = new User();
  myFormGroup: FormGroup;
  messageBoolean: boolean;

  createFormGroup() {
    return new FormGroup({
      identificacion: new FormControl('', Validators.required),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  constructor(private loginService: LoginService, private router: Router, private util: UtilService) { }

  ngOnInit(): void {
    this.myFormGroup = this.createFormGroup();
    this.util.currentBooleanMessage.subscribe(messageBoolean => this.messageBoolean = messageBoolean);
  }

  login(): void {
    if (this.myFormGroup.valid) {
      this.convertFormGroupToUser(this.myFormGroup);
      this.loginService.login(this.usuario).subscribe((response: any) => {
        swal({ icon: 'success', title: LOGIN_CORRECTO });
        this.loginService.guardarToken(response.body.token);
        this.loginService.guardarUsuario(response.body.token);
        this.usuario = this.loginService.user;
        this.util.changeBooleanMessage(true);
        setTimeout(() => {
          this.router.navigate(['/menu']);
        }, 800);
      }, () => {
        swal({ icon: 'error', title: LOGIN_INCORRECTO });
      });
    }
  }

  convertFormGroupToUser(form: FormGroup) {
    this.usuario.identificacion = form.get('identificacion').value;
    this.usuario.contrasena = form.get('contrasena').value;
  }
}
