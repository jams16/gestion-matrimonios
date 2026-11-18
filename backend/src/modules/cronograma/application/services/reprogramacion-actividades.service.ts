import { BadRequestException, Injectable } from '@nestjs/common';

export interface ActividadReprogramable extends Record<string, unknown> {
  idActividad: string;
  nombre: string;
  fechaInicio: unknown;
  fechaFin: unknown;
  idHito?: string | null;
  modificadoManualmente?: boolean;
}

export interface DependenciaReprogramable extends Record<string, unknown> {
  idActividadPredecesora: string;
  idActividadSucesora: string;
  tipoDependencia: string;
  diasDesfase: unknown;
}

export interface DesplazamientoActividad {
  idActividad: string;
  nombre: string;
  fechaInicioActual: Date | null;
  fechaFinActual: Date;
  fechaInicioSugerida: Date;
  fechaFinSugerida: Date;
  diasDesplazamiento: number;
  depth: number;
  motivo: string;
}

@Injectable()
export class ReprogramacionActividadesService {
  validarFechasActividad(inicio: Date | null | undefined, fin: Date) {
    if (Number.isNaN(fin.getTime()) || (inicio && Number.isNaN(inicio.getTime()))) {
      throw new BadRequestException('Las fechas de la actividad no son válidas.');
    }
    if (inicio && inicio.getTime() > fin.getTime()) {
      throw new BadRequestException(
        'La fecha de inicio no puede ser posterior a la fecha final.',
      );
    }
  }

  calcularInicioMinimo(
    idActividad: string,
    actividades: ActividadReprogramable[],
    dependencias: DependenciaReprogramable[],
  ): Date | null {
    const porId = new Map(actividades.map((actividad) => [actividad.idActividad, actividad]));
    let minimo: Date | null = null;
    for (const dependencia of dependencias) {
      if (
        dependencia.activo === false ||
        dependencia.tipoDependencia !== 'FINISH_TO_START' ||
        dependencia.idActividadSucesora !== idActividad
      ) continue;
      const finPredecesora = this.fecha(porId.get(dependencia.idActividadPredecesora)?.fechaFin);
      if (!finPredecesora) continue;
      const candidato = this.sumarDias(finPredecesora, Number(dependencia.diasDesfase ?? 0));
      if (!minimo || candidato.getTime() > minimo.getTime()) minimo = candidato;
    }
    return minimo;
  }

  validarDependencias(
    idActividad: string,
    inicio: Date | null | undefined,
    actividades: ActividadReprogramable[],
    dependencias: DependenciaReprogramable[],
  ) {
    if (!inicio) return null;
    const minimo = this.calcularInicioMinimo(idActividad, actividades, dependencias);
    if (minimo && inicio.getTime() < minimo.getTime()) {
      throw new BadRequestException(
        `La actividad no puede iniciar antes de ${minimo.toISOString().slice(0, 10)} por sus dependencias FINISH_TO_START.`,
      );
    }
    return minimo;
  }

  simular(
    origen: ActividadReprogramable,
    nuevaFechaInicio: Date | undefined,
    nuevaFechaFin: Date,
    actividades: ActividadReprogramable[],
    dependencias: DependenciaReprogramable[],
  ) {
    const inicioOrigen =
      nuevaFechaInicio ?? this.fecha(origen.fechaInicio) ?? nuevaFechaFin;
    this.validarFechasActividad(nuevaFechaInicio ?? this.fecha(origen.fechaInicio), nuevaFechaFin);
    const porId = new Map(
      actividades.map((actividad) => [actividad.idActividad, actividad]),
    );
    const programadas = new Map<
      string,
      { inicio: Date; fin: Date; depth: number }
    >();
    programadas.set(origen.idActividad, {
      inicio: inicioOrigen,
      fin: nuevaFechaFin,
      depth: 0,
    });
    const impactos = new Map<string, DesplazamientoActividad>();
    const cola = [origen.idActividad];
    const procesadas = new Set<string>();

    while (cola.length) {
      const idPredecesora = cola.shift()!;
      if (procesadas.has(idPredecesora)) continue;
      procesadas.add(idPredecesora);
      const programacionPredecesora = programadas.get(idPredecesora)!;
      for (const dependencia of dependencias) {
        if (
          dependencia.tipoDependencia !== 'FINISH_TO_START' ||
          dependencia.idActividadPredecesora !== idPredecesora ||
          dependencia.activo === false
        )
          continue;
        const sucesora = porId.get(dependencia.idActividadSucesora);
        if (!sucesora || sucesora.idActividad === origen.idActividad) continue;
        const inicioActual = this.fecha(sucesora.fechaInicio);
        const finActual = this.fecha(sucesora.fechaFin);
        if (!finActual) continue;
        // Una sucesora sin inicio sigue siendo válida: la regla se comprobará
        // cuando el usuario le asigne una fecha de inicio.
        if (!inicioActual) continue;
        const inicioPermitido = this.sumarDias(
          programacionPredecesora.fin,
          Number(dependencia.diasDesfase ?? 0),
        );
        const programacionExistente = programadas.get(sucesora.idActividad);
        const inicioComparacion = programacionExistente?.inicio ?? inicioActual;
        if (
          inicioComparacion &&
          inicioComparacion.getTime() >= inicioPermitido.getTime()
        )
          continue;

        const duracion = inicioActual
          ? Math.max(0, finActual.getTime() - inicioActual.getTime())
          : 0;
        const sugerida = {
          inicio: inicioPermitido,
          fin: new Date(inicioPermitido.getTime() + duracion),
          depth: programacionPredecesora.depth + 1,
        };
        programadas.set(sucesora.idActividad, sugerida);
        impactos.set(sucesora.idActividad, {
          idActividad: sucesora.idActividad,
          nombre: sucesora.nombre,
          fechaInicioActual: inicioActual,
          fechaFinActual: finActual,
          fechaInicioSugerida: sugerida.inicio,
          fechaFinSugerida: sugerida.fin,
          diasDesplazamiento: inicioActual
            ? Math.round(
                (sugerida.inicio.getTime() - inicioActual.getTime()) /
                  86_400_000,
              )
            : 0,
          depth: sugerida.depth,
          motivo: `La actividad predecesora termina después del inicio permitido; se aplicó FINISH_TO_START con ${Number(dependencia.diasDesfase ?? 0)} día(s) de desfase.`,
        });
        cola.push(sucesora.idActividad);
      }
    }
    return {
      inicioOrigen,
      finOrigen: nuevaFechaFin,
      impactos: [...impactos.values()],
    };
  }

  fecha(valor: unknown): Date | null {
    if (!valor) return null;
    if (valor instanceof Date) return new Date(valor);
    if (typeof valor === 'object' && 'epochMilliseconds' in valor)
      return new Date(
        Number((valor as { epochMilliseconds: unknown }).epochMilliseconds),
      );
    const fecha = new Date(String(valor));
    return Number.isNaN(fecha.getTime()) ? null : fecha;
  }

  private sumarDias(fecha: Date, dias: number): Date {
    const resultado = new Date(fecha);
    resultado.setUTCDate(resultado.getUTCDate() + dias);
    return resultado;
  }
}
