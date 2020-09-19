import { LoginService } from './../../../services/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuarioLogueado: boolean;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.usuarioLogueado = this.loginService.isAutenticated();
  }
  logout(): void{
    this.loginService.logout();
    alert('Has cerrado sesión correctamente');
  }

}
