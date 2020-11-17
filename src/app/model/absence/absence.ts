import { User } from '../user/user';

export class Absence {
    estudianteInasistencia: User;
    horaAlimentacion: string;
    fecha: Date;
    motivo: string;
    constructor() { }
}