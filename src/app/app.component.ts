import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { User } from './model/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'GestionSantaMariaFront';
  private usuarioService: UserService;
  usuarioLogueado = false;
  usuarios: User[];
  ruta: Router;
  constructor(usuarioService: UserService, router: Router) {
    this.usuarioService = usuarioService;
    this.ruta = router;
  }

  buscarUsuario(): void {
    this.usuarioService.getAdministrador().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      }
    );
  }
  comprobarRuta(): boolean {
    return this.ruta.url === '/';
  }
}
