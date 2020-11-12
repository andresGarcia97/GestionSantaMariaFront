import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ACTUALIZACION_ERRONEO_USUARIO, ACTUALIZACION_EXITOSA_USUARIO, DATOS_CORRECTOS, DATOS_INVALIDOS } from 'src/app/consts/messages';
import { Student } from 'src/app/model/student/student';
import { UserService } from 'src/app/services/user/user.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html'
})
export class UpdateComponent implements OnInit {

  @Input() usuario: Student;
  myFormGroup: FormGroup;
  tipoUsuario = '';
  @Output() updateEvent = new EventEmitter<Optional>();

  constructor(private usuarioService: UserService) { }

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      identificacion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
    this.tipoUsuario = this.usuario.tipoUsuario;
    this.myFormGroup = this.createFormGroup();
  }

  actualizarUsuario() {
    if (this.myFormGroup.valid) {
      swal({ icon: 'info', title: DATOS_CORRECTOS });
      this.usuario = this.myFormGroup.value;
      this.usuarioService.update(this.usuario)
        .subscribe(() => {
          this.usuario.tipoUsuario = this.tipoUsuario;
          this.usuarioService.guardarTipoUsuario(this.usuario);
          swal({ icon: 'info', title: ACTUALIZACION_EXITOSA_USUARIO });
          this.updateEvent.emit();
        }, () => {
          swal({ icon: 'info', title: ACTUALIZACION_ERRONEO_USUARIO });
        });
    } else {
      swal({ icon: 'warning', title: DATOS_INVALIDOS });
    }
  }

  convertFormGroupToUser(form: FormGroup) {
    this.usuario.nombre = form.get('nombre').value;
    this.usuario.apellido = form.get('apellido').value;
    this.usuario.identificacion = form.get('identificacion').value;
    this.usuario.telefono = form.get('telefono').value;
    this.usuario.correo = form.get('correo').value;
  }
}
