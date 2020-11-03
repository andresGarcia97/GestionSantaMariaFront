import { User } from '../user/user';

export class Course {
  nombreMateria: string;
  horarios: Horario[];
  estudiante: User;
  constructor() { }
}
export class Horario {
  horaInicial: Date;
  dia: string;
  horaFinal: Date;
  constructor() { }
}
