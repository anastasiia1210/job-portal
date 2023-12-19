import { Module } from '@nestjs/common';
import { SeekerService } from './seeker.service';
import { SeekerController } from './seeker.controller';

@Module({
  controllers: [SeekerController],
  providers: [SeekerService],
})
export class SeekerModule {}
