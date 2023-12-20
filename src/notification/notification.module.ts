import { Module } from '@nestjs/common';
import { NotificationJobService } from './notification.service';
import { NotificationJobController } from './notification.controller';

@Module({
  controllers: [NotificationJobController],
  providers: [NotificationJobService],
})
export class NotificationModule {}
