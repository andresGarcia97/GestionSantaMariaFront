import { Component, OnInit } from '@angular/core';
import { ACADEMICO, ALMUERZO, CENA, DESAYUNO, HORA_ALMUERZO, HORA_CENA, HORA_DESAYUNO, PERSONAL, RECREATIVO } from 'src/app/consts/consts';
import {
  ERROR_HORA_INASISTENCIA as ERROR_HORA_INASISTENCIA, REGISTRO_INASISTECIA_EXITOSO, REGISTRO_INASISTENCIA_ERRONEO, VERIFACION_DE_CAMPOS,
  VERIFACION_DE_FECHAS
} from 'src/app/consts/messages';
import { TIPOSTORAGE } from 'src/app/consts/StorageKeys';
import { Absence } from 'src/app/model/absence/absence';
import { User } from 'src/app/model/user/user';
import { AbsenceService } from 'src/app/services/absences/absence.service';
import { UtilService } from 'src/app/services/util/util.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styles: []
})
export class AbsencesComponent implements OnInit {

  user: User = new User();
  inasistencia: Absence = new Absence();
  inasistencias: Absence[] = [];
  tipoUsuario = false;

  horarios = [{ hora: DESAYUNO }, { hora: ALMUERZO }, { hora: CENA }];
  motivos = [{ motivo: PERSONAL }, { motivo: ACADEMICO }, { motivo: RECREATIVO }];
  rutaLavadora = false;

  constructor(private absenceService: AbsenceService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(TIPOSTORAGE)) as User;
    this.resetInputs();
    this.tipoUsuario = this.utilService.isEstudent(this.user);
    this.absenceService.getInasistencias().subscribe(
      (inasistencias) => {
        this.inasistencias = inasistencias;
      });
  }

  inasistenciaValida(): boolean {
    return (this.inasistencia.motivo !== '' && this.inasistencia.horaAlimentacion !== '' && this.inasistencia.fecha !== null);
  }

  private resetInputs(): void {
    this.inasistencia = new Absence();
    this.inasistencia.estudianteInasistencia = this.user;
    this.inasistencia.fecha = null;
    this.inasistencia.horaAlimentacion = '';
    this.inasistencia.motivo = '';
  }

  private cambiarFecha(): void {
    this.inasistencia.fecha = new Date(this.inasistencia.fecha);
  }

  private verificarFecha(fecha: Date): boolean {
    const fechaActual = this.utilService.convertDateToNumber(new Date());
    const fechaInicio = this.utilService.convertDateToNumber(fecha);
    return fechaInicio < fechaActual;
  }

  private validarHoras(): boolean {
    if ((((HORA_DESAYUNO - this.inasistencia.fecha.getHours()) <= 1 && this.inasistencia.horaAlimentacion.includes(DESAYUNO)) ||
      ((HORA_ALMUERZO - this.inasistencia.fecha.getHours()) <= 1 && this.inasistencia.horaAlimentacion.includes(ALMUERZO)) ||
      ((HORA_CENA - this.inasistencia.fecha.getHours()) <= 1 && this.inasistencia.horaAlimentacion.includes(CENA)))) {
      return true;
    }
    return false;
  }

  registrarInasistencia(): void {
    this.cambiarFecha();
    if (!this.inasistenciaValida()) {
      swal({ icon: 'warning', title: VERIFACION_DE_CAMPOS });
    }
    else if (this.verificarFecha(this.inasistencia.fecha)) {
      swal({ icon: 'warning', title: VERIFACION_DE_FECHAS });
    }
    else if (this.validarHoras()) {
      swal({ icon: 'warning', title: ERROR_HORA_INASISTENCIA.concat(this.inasistencia.horaAlimentacion) });
    }
    else {
      const nuevaInasistencia = [];
      nuevaInasistencia.push(this.inasistencia);
      this.absenceService.createInasistencia(nuevaInasistencia).subscribe(
        () => {
          swal({ icon: 'success', title: REGISTRO_INASISTECIA_EXITOSO });
          this.inasistencias.push(this.inasistencia);
          this.resetInputs();
        }, () => {
          swal({ icon: 'error', title: REGISTRO_INASISTENCIA_ERRONEO });
        });
    }
  }

}
