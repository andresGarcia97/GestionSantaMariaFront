import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usuario = new User();
  myFormGroup: FormGroup;

  createFormGroup(){
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
    console.log(this.myFormGroup.value);
  }
  showPopup(tipoUsuario: string ) {
  //  this.usuario.tipoUsuario = tipoUsuario;
  }

  agregarUsuario() {
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
