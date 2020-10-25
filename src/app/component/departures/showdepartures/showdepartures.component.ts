import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-showdepartures',
  templateUrl: './showdepartures.component.html',
  styleUrls: ['./showdepartures.component.css']
})
export class ShowdeparturesComponent implements OnInit {
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
        this.router.navigate(['/listarusuarios']);
        alert('Borrado exitoso del usuario');
      }
    );
  }
  update() {
    this.userService.update(this.selectedUser)
      .subscribe(data => {
        this.router.navigate(['/listarusuarios']);
        alert('Actualizacion exitosa del usuario');
      }, err => {
        this.router.navigate(['/listarusuarios']);
        alert('Error al Actualizar el usuario, verifique que los campos no esten vacios');
      });
    this.router.navigate(['/listarusuarios']);
  }
  usuarioValido(user: User): boolean {
    return (user.nombre === '' || user.apellido === '' || user.telefono === null || user.correo === '');
  }

}
