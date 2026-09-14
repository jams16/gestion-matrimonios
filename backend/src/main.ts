import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ApiExceptionFilter } from './common/filters/api-exception.filter';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS ??
    process.env.FRONTEND_URL ??
    '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allowed?: boolean) => void,
    ) => {
      // Flutter Web uses a dynamic localhost port during development.
      const isFlutterLocalhost =
        process.env.NODE_ENV !== 'production' &&
        !!origin &&
        /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
      if (!origin || isFlutterLocalhost || allowedOrigins.includes(origin))
        return callback(null, true);
      return callback(new Error('Origen no permitido por CORS.'), false);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new ApiExceptionFilter());
  app.useGlobalInterceptors(new ApiResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Gestión de Matrimonios API')
    .setDescription('API REST del sistema de gestión de matrimonios')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;

  await app.listen(port);
}

bootstrap();
