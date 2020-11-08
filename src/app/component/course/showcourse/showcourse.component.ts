import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IDENTIFICACIONSTORAGE, TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { Student } from 'src/app/model/student/student';
import { User } from 'src/app/model/user/user';
import { CourseService } from 'src/app/services/course/course.service';
import { UtilService } from 'src/app/services/util/util.service';
import { Course, Horario } from './../../../model/course/course';

@Component({
  selector: 'app-showcourse',
  templateUrl: './showcourse.component.html'
})

export class ShowcourseComponent implements OnChanges, OnInit {

  user: User = new User();
  estudiante: Student = new Student();
  materias: Course[] = [];
  @Input() identificacion: number;

  constructor(private courseService: CourseService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.estudiante = JSON.parse(localStorage.getItem(TIPOSTORAGE)) as Student;
    const tipoEstudiante = this.utilService.isEstudent(this.estudiante);
    if (tipoEstudiante) {
      this.user.identificacion = this.estudiante.identificacion;
      this.consultarListaMaterias();
    }
  }

  ngOnChanges(): void {
    if (!this.identificacion || this.identificacion == null) {
      this.user = JSON.parse(localStorage.getItem(IDENTIFICACIONSTORAGE)) as User;
    }
    else {
      this.user.identificacion = this.identificacion;
    }
    this.consultarListaMaterias();
  }

  private consultarListaMaterias() {
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
