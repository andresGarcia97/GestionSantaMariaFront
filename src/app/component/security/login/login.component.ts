import { UtilService } from './../../../services/util/util.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: User;
  myFormGroup: FormGroup;
  messageBoolean: boolean;
  createFormGroup(){
    return new FormGroup({
      identificacion: new FormControl('', Validators.required),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }
  constructor(private loginService: LoginService, private router: Router, private util: UtilService) {
    this.usuario = new User();
  }

  ngOnInit(): void {
    this.myFormGroup = this.createFormGroup();
    this.util.currentBooleanMessage.subscribe(messageBoolean => this.messageBoolean = messageBoolean);
  }

  login(): void {
    if (this.myFormGroup.valid){
      this.convertFormGroupToUser(this.myFormGroup);
      this.loginService.login(this.usuario).subscribe((response: any) => {
        this.loginService.guardarUsuario(response.body.token);
        this.loginService.guardarToken();
        this.usuario = this.loginService.user;
        this.util.changeBooleanMessage(true);
        this.router.navigate(['/menu']);
        alert('Bienvenido ' + this.usuario.identificacion + ', has iniciado sesión con éxito');
      }, _ => {
        alert('usuario o clave incorrectas');
      });
    }
  }
  convertFormGroupToUser(form: FormGroup) {
    this.usuario.identificacion = form.get('identificacion').value;
    this.usuario.contrasena = form.get('contrasena').value;
  }
}