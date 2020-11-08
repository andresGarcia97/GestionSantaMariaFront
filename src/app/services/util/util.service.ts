import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ESTUDIANTE } from 'src/app/consts/consts';
import { Student } from 'src/app/model/student/student';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private messageStringSource = new BehaviorSubject<string>('default message');
  currentMessage = this.messageStringSource.asObservable();

  private messageBoolean = new BehaviorSubject<boolean>(false);
  currentBooleanMessage = this.messageBoolean.asObservable();

  constructor() { }

  changeStringMessage(message: string) {
    this.messageStringSource.next(message);
  }
  changeBooleanMessage(messageBoolean: boolean) {
    this.messageBoolean.next(messageBoolean);
  }

  isEstudent(user: Student): boolean {
    if (user !== null && user.tipoUsuario !== '') {
      return user.tipoUsuario === ESTUDIANTE;
    }
    return false;
  }
}
