import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { InvolucradosModule } from './modules/involucrados/involucrados.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    InvolucradosModule,
  ],
})
export class AppModule {}
