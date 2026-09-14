import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

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
        const value = result as { mensaje?: string; data?: T };
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
          data: result,
        };
      }),
    );
  }
}
