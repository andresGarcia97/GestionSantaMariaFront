import { Component, OnInit } from '@angular/core';
import { ERRROR_CONSULTAR_PERFIL, TIPO_DE_USUARIO } from 'src/app/consts/messages';
import { IDENTIFICACIONSTORAGE, TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { Student } from 'src/app/model/student/student';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: Student;
  tipoEstudiante = false;

  constructor(private userService: UserService, private utilService: UtilService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(TIPOSTORAGE));
    if (this.user === null) {
      this.user =  JSON.parse(localStorage.getItem(IDENTIFICACIONSTORAGE)) as Student;
      this.userService.getUsuario(this.user).subscribe(data => {
        this.user = data as Student;
        this.userService.guardarTipoUsuario(this.user);
        this.tipoEstudiante = this.utilService.isEstudent(this.user);
        alert(TIPO_DE_USUARIO.concat(this.user.tipoUsuario));
      }, () => {
        alert(ERRROR_CONSULTAR_PERFIL);
      }
      );
    } else {
      this.tipoEstudiante = this.utilService.isEstudent(this.user);
    }
  }

}
