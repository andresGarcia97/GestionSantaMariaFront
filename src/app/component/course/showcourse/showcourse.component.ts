import { Component, OnInit } from '@angular/core';
import { IDENTIFICACIONSTORAGE, USUARIOSTORAGE } from 'src/app/consts/StorageKeys';
import { Departure } from 'src/app/model/departure/departure';
import { User } from 'src/app/model/user/user';
import { CourseService } from 'src/app/services/course/course.service';
import { Course } from './../../../model/course/course';

@Component({
  selector: 'app-showcourse',
  templateUrl: './showcourse.component.html'
})

export class ShowcourseComponent implements OnInit {
  user: User = new User();
  salidaUsuarioLogueado: Departure = new Departure();
  materias: Course[] = [];
  constructor(private courseService: CourseService) { }
  ngOnInit(): void {
    if (localStorage.getItem(IDENTIFICACIONSTORAGE) == null) {
      this.user = JSON.parse(sessionStorage.getItem(USUARIOSTORAGE)) as User;
    } else {
      this.user.identificacion = Number(localStorage.getItem(IDENTIFICACIONSTORAGE));
      localStorage.removeItem(IDENTIFICACIONSTORAGE);
    }
    this.courseService.listAllMateriasUsuarioLogueado(this.user).subscribe(
      (materias) => {
        this.materias = materias;
      }
    );
  }
}
