import { User } from '../user/user';
export class Student extends User {
  universidad: string;
  // imagen codificada en base64
  firma: string;
  // materias: Course[];
  // inasistencias: Absence[];
  // labores: Labor[];
  // salidas: Departure[];
  constructor() { super(); }
}
