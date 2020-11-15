import { Course } from '../course/course';
import { Departure } from '../departure/departure';
import { Labor } from '../labor/labor';
import { User } from '../user/user';
export class Student extends User {
  universidad: string;
  // imagen codificada en base64
  firma: string;
  materias: Course[];
  // inasistencias: InasistenciaAlimentacion[];
  labores: Labor[];
  salidas: Departure[];
  constructor() { super(); }
}
