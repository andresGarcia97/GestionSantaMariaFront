import { Student } from 'src/app/model/student/student';
import { DtoChangePassword } from 'src/app/model/changePassword/dto-change-password';
import { LoginService } from 'src/app/services/login/login.service';
import { User } from 'src/app/model/user/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Student;
  contrasenas: DtoChangePassword = new DtoChangePassword();
  constructor(private userService: UserService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.loginService.user as Student;
    this.userService.getUsuario(this.user).subscribe(data => {
        this.user = data as Student;
        this.contrasenas.identificacion = this.user.identificacion;
    }, err => {
      alert('Error al ver tu perfil');
  }
    );
  }
  updatePassword(){
    if (this.contrasenaValida(this.contrasenas)){
        this.userService.updatePassword(this.contrasenas).subscribe(
          data => {
          }, err => {
          alert('Error al cambiar la contraseña');
        }
        );
    }
    else { alert('Por favor verfique la nueva contraseña'); }
}
  contrasenaValida(contrasena: DtoChangePassword): boolean {
    return ((contrasena.nuevaContrasena == contrasena.repetirContrasena) && contrasena.nuevaContrasena.length >= 8);
  }
}
