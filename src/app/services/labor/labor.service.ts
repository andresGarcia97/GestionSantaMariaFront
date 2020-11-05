import { Injectable } from '@angular/core';
import { LOCALHOST } from 'src/environments/environment';

const ENDPOINT_LABOR = LOCALHOST.concat('labores/');
const LISTAR_LABORES = ENDPOINT_LABOR.concat('listar');
const GUARDAR_LABOR = ENDPOINT_LABOR.concat('guardarlabor');
const ACTUALIZAR_LABORES = ENDPOINT_LABOR.concat('actualizarlabor');
const ELIMINAR_LABOR = ENDPOINT_LABOR.concat('eliminarlabor');

@Injectable({
  providedIn: 'root'
})
export class LaborService {

  constructor() { }
}
