import { Course } from './../../../model/course/course';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departure } from 'src/app/model/departure/departure';
import { User } from 'src/app/model/user/user';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-showcourse',
  templateUrl: './showcourse.component.html',
  styleUrls: ['./showcourse.component.css']
})
export class ShowcourseComponent implements OnInit {
  user: User = new User();
  salidaUsuarioLogueado: Departure = new Departure();
  materias: Course[] = [];
  constructor(private courseService: CourseService) { }
  ngOnInit(): void {
    if (localStorage.getItem('identificacion') == null){
      this.user = JSON.parse(sessionStorage.getItem('usuario')) as User;
    }else{
      this.user.identificacion = Number(localStorage.getItem('identificacion'));
      localStorage.removeItem('identificacion');
    }
    this.courseService.listAllMateriasUsuarioLogueado(this.user).subscribe(
      (materias) => {
        this.materias = materias;
      }
    );
  }

}
