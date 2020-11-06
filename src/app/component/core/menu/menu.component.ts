import { Component, OnInit } from '@angular/core';
import { ESTUDIANTE } from 'src/app/consts/consts';
import { ERRROR_CONSULTAR_PERFIL, TIPO_DE_USUARIO } from 'src/app/consts/messages';
import { TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { Student } from 'src/app/model/student/student';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: Student;
  tipoEstudiante = false;

  constructor(private userService: UserService, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(TIPOSTORAGE));
    if (this.user === null) {
      this.user = this.loginService.user as Student;
      this.userService.getUsuario(this.user).subscribe(data => {
        this.user = data as Student;
        this.userService.guardarTipoUsuario(this.user);
        this.tipoEstudiante = this.user.tipoUsuario === ESTUDIANTE;
        alert(TIPO_DE_USUARIO.concat(this.user.tipoUsuario));
      }, () => {
        alert(ERRROR_CONSULTAR_PERFIL);
      }
      );
    } else {
      this.tipoEstudiante = this.user.tipoUsuario === ESTUDIANTE;
    }
  }

}
