import { Student } from 'src/app/model/student/student';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  @Input() usuario: Student;
  myFormGroup: FormGroup;

  createFormGroup(){
    return new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      identificacion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      universidad: new FormControl('')
    });
  }
  constructor(private usuarioService: UserService, private router: Router) {
  }
  ngOnInit(): void {
    this.myFormGroup = this.createFormGroup();
  }
  actualizarUsuario() {
    if (this.myFormGroup.valid) {
      alert('Datos correctos');
      this.usuario = this.myFormGroup.value;
      this.usuarioService.update(this.usuario)
        .subscribe(data => {
          // Entra aquí con respuesta del servicio correcta código http 200
          window.location.reload();
          alert('La actualizacion fue exitosa');
      }, err => {
          // Entra aquí si el servicio entrega un código http de error EJ: 404, 500
          alert('Error al actualizar el usuario');
      });
    } else {
      alert('Datos invalidos');
    }
  }
  isAdministrador(): boolean{
    return (this.usuario.tipoUsuario === 'ADMINISTRADOR');
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
