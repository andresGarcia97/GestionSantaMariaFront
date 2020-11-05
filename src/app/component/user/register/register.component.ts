import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ESTUDIANTE } from 'src/app/consts/consts';
import { DATOS_CORRECTOS, DATOS_INVALIDOS, INGRESO_ERRONEO_USUARIO, INGRESO_EXITOSO_ADMINISTRADOR, INGRESO_EXITOSO_ESTUDIANTE } from 'src/app/consts/messages';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';

const RUTA_LISTA_USUARIOS = '/listarusuarios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  usuario = new User();
  myFormGroup: FormGroup;

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      identificacion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
      tipoUsuario: new FormControl('', Validators.required),
      acceptTerms: new FormControl(false, Validators.requiredTrue)
    });
  }
  constructor(private usuarioService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.myFormGroup = this.createFormGroup();
  }

  agregarUsuario() {
    if (this.myFormGroup.valid) {
      alert(DATOS_CORRECTOS);
      this.usuario = this.myFormGroup.value;
      if (this.myFormGroup.get('tipoUsuario').value === ESTUDIANTE) {
        this.usuarioService.createEstudiante(this.usuario)
          .subscribe(() => {
            // Entra aquí con respuesta del servicio correcta código http 200
            alert(INGRESO_EXITOSO_ESTUDIANTE);
            this.router.navigate([RUTA_LISTA_USUARIOS]);
          }, () => {
            // Entra aquí si el servicio entrega un código http de error EJ: 404, 500
            alert(INGRESO_ERRONEO_USUARIO);
          });
      } else {
        this.usuarioService.createAdministrador(this.usuario)
          .subscribe(() => {
            alert(INGRESO_EXITOSO_ADMINISTRADOR);
            this.router.navigate([RUTA_LISTA_USUARIOS]);
          }, () => {
            alert(INGRESO_ERRONEO_USUARIO);
          });
      }
    } else {
      alert(DATOS_INVALIDOS);
    }
  }
  convertFormGroupToUser(form: FormGroup) {
    this.usuario.nombre = form.get('nombre').value;
    this.usuario.apellido = form.get('apellido').value;
    this.usuario.identificacion = form.get('identificacion').value;
    this.usuario.telefono = form.get('telefono').value;
    this.usuario.contrasena = form.get('contrasena').value;
    this.usuario.correo = form.get('correo').value;
  }
}
