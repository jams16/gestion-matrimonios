import { Module } from '@nestjs/common';
import { CronogramaDateService } from './application/services/cronograma-date.service';

@Module({
  providers: [CronogramaDateService],
  exports: [CronogramaDateService],
})
export class CronogramaModule {}
