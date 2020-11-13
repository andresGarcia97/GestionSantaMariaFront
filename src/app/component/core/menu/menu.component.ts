import { Component, OnInit } from '@angular/core';
import { TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { User } from 'src/app/model/user/user';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: User;
  tipoEstudiante = false;

  constructor(private utilService: UtilService) { }

  async ngOnInit() {
    this.user = await JSON.parse(localStorage.getItem(TIPOSTORAGE));
    this.tipoEstudiante = this.utilService.isEstudent(this.user);
  }

}
