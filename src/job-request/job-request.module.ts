import { Module } from '@nestjs/common';
import { JobRequestService } from './job-request.service';
import { JobRequestController } from './job-request.controller';

@Module({
  controllers: [JobRequestController],
  providers: [JobRequestService],
})
export class JobRequestModule {}
