import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private messageStringSource = new BehaviorSubject<string>('default message');
  currentMessage = this.messageStringSource.asObservable();

  private messageBoolean = new BehaviorSubject<boolean>(false);
  currentBooleanMessage = this.messageBoolean.asObservable();

  constructor(){ }

  changeStringMessage(message: string){
    this.messageStringSource.next(message);
  }
  changeBooleanMessage(messageBoolean: boolean){
    this.messageBoolean.next(messageBoolean);
  }
}
