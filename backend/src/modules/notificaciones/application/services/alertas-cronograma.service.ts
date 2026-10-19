import { Injectable } from '@nestjs/common';
export const DIAS_ALERTA_CRONOGRAMA = 3;
@Injectable()
export class AlertasCronogramaService {
  clasificar(fecha: Date, hoy: Date): 'PROXIMA' | 'VENCIDA' | null {
    const inicioHoy = new Date(
      Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), hoy.getUTCDate()),
    );
    const limite = new Date(inicioHoy);
    limite.setUTCDate(limite.getUTCDate() + DIAS_ALERTA_CRONOGRAMA);
    if (fecha.getTime() < inicioHoy.getTime()) return 'VENCIDA';
    return fecha.getTime() <= limite.getTime() ? 'PROXIMA' : null;
  }
}
