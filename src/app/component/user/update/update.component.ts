import { Component, OnInit } from '@angular/core';
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

  usuario = new User();
  myFormGroup: FormGroup;

  createFormGroup(){
    return new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      identificacion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email])
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
      if ( this.myFormGroup.get('tipoUsuario').value === 'ESTUDIANTE' ){
        this.usuarioService.createEstudiante(this.usuario)
          .subscribe(data => {
            // Entra aquí con respuesta del servicio correcta código http 200
            alert('Ingreso exitoso del Estudiante');
            this.router.navigate(['/listarusuarios']);
        }, err => {
            // Entra aquí si el servicio entrega un código http de error EJ: 404, 500
            alert('Error al ingresar el Estudiante, verifique que no exista');
        });
      } else{
        this.usuarioService.createAdministrador(this.usuario)
        .subscribe(data => {
          alert('Ingreso exitoso del Administrador');
          this.router.navigate(['/listarusuarios']);
      }, err => {
          alert('Error al ingresar el administrador, verifique que no exista');
      });
      }
    } else {
      alert('Datos invalidos');
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
