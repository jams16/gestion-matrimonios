import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let mensaje = 'Ocurrió un error interno.';

    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      if (typeof body === 'string') mensaje = body;
      else if (body && typeof body === 'object' && 'message' in body) {
        const message = (body as { message: string | string[] }).message;
        mensaje = Array.isArray(message) ? message.join('; ') : message;
      }
    } else {
      const detalle =
        exception instanceof Error
          ? exception.stack ?? exception.message
          : String(exception);
      this.logger.error(
        `Error no controlado en ${request.method} ${request.url}`,
        detalle,
      );
    }

    response.status(status).json({ mensaje, data: null });
  }
}
