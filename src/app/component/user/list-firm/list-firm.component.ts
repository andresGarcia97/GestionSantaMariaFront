import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student/student';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-list-firm',
  templateUrl: './list-firm.component.html'
})
export class ListFirmComponent implements OnInit {

  estudiantes: Student[] = [];
  selectedUser: Student = new Student();
  base64Image: any;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.listAllFirms().subscribe(
      (estudiantes) => {
        this.estudiantes = estudiantes;
      }
    );
  }

  showPopup(user: Student) {
    this.base64Image = new Image();
    this.selectedUser = user;
    this.base64Image = 'data:image/jpeg;base64,' + this.selectedUser.firma;
  }

}
