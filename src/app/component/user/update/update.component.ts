import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ADMINISTRADOR } from 'src/app/consts/consts';
import { ACTUALIZACION_ERRONEO_USUARIO, ACTUALIZACION_EXITOSA_USUARIO, DATOS_CORRECTOS, DATOS_INVALIDOS } from 'src/app/consts/messages';
import { Student } from 'src/app/model/student/student';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html'
})
export class UpdateComponent implements OnInit {

  @Input() usuario: Student;
  myFormGroup: FormGroup;

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      identificacion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      universidad: new FormControl('')
    });
  }
  constructor(private usuarioService: UserService) {
  }
  ngOnInit(): void {
    this.myFormGroup = this.createFormGroup();
  }
  actualizarUsuario() {
    if (this.myFormGroup.valid) {
      alert(DATOS_CORRECTOS);
      this.usuario = this.myFormGroup.value;
      this.usuarioService.update(this.usuario)
        .subscribe(() => {
          // Entra aquí con respuesta del servicio correcta código http 200
          window.location.reload();
          alert(ACTUALIZACION_EXITOSA_USUARIO);
        }, () => {
          // Entra aquí si el servicio entrega un código http de error EJ: 404, 500
          alert(ACTUALIZACION_ERRONEO_USUARIO);
        });
    } else {
      alert(DATOS_INVALIDOS);
    }
  }
  isAdministrador(): boolean {
    return (this.usuario.tipoUsuario === ADMINISTRADOR);
  }
  convertFormGroupToUser(form: FormGroup) {
    this.usuario.nombre = form.get('nombre').value;
    this.usuario.apellido = form.get('apellido').value;
    this.usuario.identificacion = form.get('identificacion').value;
    this.usuario.telefono = form.get('telefono').value;
    this.usuario.contrasena = form.get('contrasena').value;
    this.usuario.correo = form.get('correo').value;
    this.usuario.universidad = form.get('universidad').value;
  }
}
