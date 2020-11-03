import { User } from '../user/user';

export class Reservation {
  usuario: User;
  fechaInicial: Date;
  actividad: string;
  fechaFinal: Date;
  espacio: string;
  constructor() { }
}
