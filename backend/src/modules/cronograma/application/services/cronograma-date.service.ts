import { Injectable } from '@nestjs/common';

export const DURACION_BASE_PLANTILLA_DIAS = 395;

export type TipoTemporalCronograma =
  | 'INICIO'
  | 'ESCALABLE'
  | 'FIJO_EVENTO'
  | 'DIA_EVENTO'
  | 'POST_EVENTO';

@Injectable()
export class CronogramaDateService {
  calcularFactorEscalamiento(inicio: Date, matrimonio: Date): number {
    return this.diasEntre(inicio, matrimonio) / DURACION_BASE_PLANTILLA_DIAS;
  }

  calcularFechaObjetivo(inicio: Date, matrimonio: Date, tipo: TipoTemporalCronograma, offsetBaseDias: number, offsetMinimoDias?: number | null): Date {
    const duracion = Math.max(0, this.diasEntre(inicio, matrimonio));
    if (tipo === 'INICIO') return inicio;
    if (tipo === 'DIA_EVENTO') return matrimonio;
    if (tipo === 'POST_EVENTO') return this.sumarDias(matrimonio, offsetBaseDias);
    const offset = tipo === 'FIJO_EVENTO' ? offsetBaseDias : Math.min(duracion, Math.max(offsetMinimoDias ?? 0, Math.round(offsetBaseDias * duracion / DURACION_BASE_PLANTILLA_DIAS)));
    const fecha = this.sumarDias(matrimonio, -offset);
    return fecha < inicio ? inicio : fecha;
  }

  calcularPeriodoActividad(inicioProyecto: Date, fechaFin: Date, duracionDias: number) {
    const fechaInicio = this.sumarDias(fechaFin, -Math.max(0, duracionDias));
    return { fechaInicio: fechaInicio < inicioProyecto ? inicioProyecto : fechaInicio, fechaFin };
  }

  private diasEntre(inicio: Date, fin: Date) { return Math.round((fin.getTime() - inicio.getTime()) / 86400000); }
  private sumarDias(fecha: Date, dias: number) { const resultado = new Date(fecha); resultado.setUTCDate(resultado.getUTCDate() + dias); return resultado; }
}
