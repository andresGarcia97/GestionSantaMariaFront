import { Component, OnInit } from '@angular/core';
import { IDENTIFICACIONSTORAGE, USUARIOSTORAGE } from 'src/app/consts/StorageKeys';
import { User } from 'src/app/model/user/user';
import { CourseService } from 'src/app/services/course/course.service';
import { Course, Horario } from './../../../model/course/course';

@Component({
  selector: 'app-showcourse',
  templateUrl: './showcourse.component.html'
})

export class ShowcourseComponent implements OnInit {
  user: User = new User();
  materias: Course[] = [];
  constructor(private courseService: CourseService) { }
  ngOnInit(): void {
    if (localStorage.getItem(IDENTIFICACIONSTORAGE) == null) {
      this.user = JSON.parse(localStorage.getItem(USUARIOSTORAGE)) as User;
    } else {
      this.user.identificacion = Number(localStorage.getItem(IDENTIFICACIONSTORAGE));
      localStorage.removeItem(IDENTIFICACIONSTORAGE);
    }
    this.courseService.listAllMateriasUsuarioLogueado(this.user).subscribe(
      (materias) => {
        this.materias = materias;
        this.materias.forEach(materia => {
          const horarios = materia.horarios;
          if (horarios.length > 1) {
            const course = new Course();
            course.nombreMateria = materia.nombreMateria;
            course.horarios = [];
            for (let i = 1; i < horarios.length; i++) {
              const horaYdia = new Horario();
              horaYdia.dia = horarios[i].dia;
              horaYdia.horaInicial = horarios[i].horaInicial;
              horaYdia.horaFinal = horarios[i].horaFinal;
              course.horarios.push(horaYdia);
              this.materias.push(course);
            }
          }
        });
        this.materias.sort((a, b) => (a.nombreMateria > b.nombreMateria) ? 1 : -1);
      }
    );
  }
}
