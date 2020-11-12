import { UtilService } from './../../../services/util/util.service';
import { LoginService } from './../../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { LOGOUT, NO_LOGUEADO } from 'src/app/consts/messages';
import swal from 'sweetalert';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  messageBoolean: boolean;

  constructor(private util: UtilService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.util.currentBooleanMessage.subscribe(messageBoolean => this.messageBoolean = messageBoolean);
    this.messageBoolean = this.loginService.isAutenticated();
  }

  logout(): void {
    if (this.loginService.token === null) {
      swal({ icon: 'error', title: NO_LOGUEADO });
    }
    else{
      this.loginService.logout();
      this.util.changeBooleanMessage(false);
      swal({ icon: 'success', title: LOGOUT });
    }
  }
}
