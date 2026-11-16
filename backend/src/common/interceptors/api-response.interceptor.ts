import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Temporal } from 'temporal-polyfill';

import { ApiResponse } from '../types/api-response.type';

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((result) => {
        const value = serializarBigInt(result) as { mensaje?: string; data?: T };
        if (
          value &&
          typeof value === 'object' &&
          'mensaje' in value &&
          'data' in value
        ) {
          return value as ApiResponse<T>;
        }
        return {
          mensaje:
            response.statusCode === 201
              ? 'Registro creado.'
              : 'Operación exitosa.',
          data: value as T,
        };
      }),
    );
  }
}

/// JSON.stringify no admite bigint. Los IDs BIGINT del contrato se exponen
/// como texto para evitar pérdida de precisión en clientes JavaScript/Flutter.
function serializarBigInt(valor: unknown): unknown {
  if (typeof valor === 'bigint') return valor.toString();
  if (valor instanceof Temporal.Instant) return valor.toString();
  if (valor instanceof Date || valor === null || typeof valor !== 'object') {
    return valor;
  }
  if (Array.isArray(valor)) return valor.map(serializarBigInt);
  return Object.fromEntries(
    Object.entries(valor).map(([clave, contenido]) => [
      clave,
      serializarBigInt(contenido),
    ]),
  );
}
