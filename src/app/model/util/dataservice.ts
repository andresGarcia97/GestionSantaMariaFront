export class Dataservice {
  private dias: string[] = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];
  private turnos: string[] = ['DESAYUNO', 'ALMUERZO', 'CENA'];
  constructor(){}
  getDias() {
    return this.dias;
  }
  getTurnos() {
    return this.turnos;
  }
}
