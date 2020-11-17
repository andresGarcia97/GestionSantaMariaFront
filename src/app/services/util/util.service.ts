import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ESTUDIANTE } from 'src/app/consts/consts';
import { User } from 'src/app/model/user/user';

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

  public isEstudent(user: User): boolean {
    if (user !== null && user.tipoUsuario !== '') {
      return user.tipoUsuario === ESTUDIANTE;
    }
    return false;
  }

  public convertDateToNumber(fecha: Date): number {
    return new Date(fecha).valueOf();
  }

  public verificarFechas(fechaInicial: Date, fechaFinal: Date): boolean {
    const fechaActual = this.convertDateToNumber(new Date());
    const fechaInicio = this.convertDateToNumber(fechaInicial);
    const fechaFin = this.convertDateToNumber(fechaFinal);
    return fechaInicio > fechaActual && fechaFin > fechaActual;
  }
}
