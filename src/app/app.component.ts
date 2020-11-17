import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  ruta: Router;

  constructor(router: Router) {
    this.ruta = router;
  }

  comprobarRuta(): boolean {
    return this.ruta.url === '/';
  }
}
