import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ACTUALIZACION_ERRONEA_USUARIO, ACTUALIZACION_EXITOSA_USUARIO, BORRADO_EXITOSO_USUARIO } from 'src/app/consts/messages';
import { Student } from 'src/app/model/student/student';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';

const RUTA_LISTAR_USUARIO = '/listarusuarios';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  usuarios: User[] = [];
  administradores: User[];
  selectedUser: User = new User();
  constructor(private userService: UserService, private router: Router) { }

  showPopup(user: User) {
    this.selectedUser = user;
  }
  ngOnInit(): void {
    this.userService.listAllStudents().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      }
    );
    this.userService.listAllAdmins().subscribe(
      (administradores) => {
        this.usuarios = this.usuarios.concat(administradores);
      }
    );
  }
  delete(selectedUser: User) {
    this.userService.delete(selectedUser.identificacion).subscribe(
      _ => {
        this.usuarios = this.usuarios.filter(producto => producto !== selectedUser);
        this.router.navigate([RUTA_LISTAR_USUARIO]);
        alert(BORRADO_EXITOSO_USUARIO);
      }
    );
  }
  update() {
    this.userService.update(this.selectedUser as Student)
      .subscribe(() => {
        this.router.navigate([RUTA_LISTAR_USUARIO]);
        alert(ACTUALIZACION_EXITOSA_USUARIO);
      }, () => {
        this.router.navigate([RUTA_LISTAR_USUARIO]);
        alert(ACTUALIZACION_ERRONEA_USUARIO);
      });
    this.router.navigate([RUTA_LISTAR_USUARIO]);
  }
  usuarioValido(user: User): boolean {
    return (user.nombre === '' || user.apellido === '' || user.telefono === null || user.correo === '');
  }
}
