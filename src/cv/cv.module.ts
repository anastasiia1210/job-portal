import { Module } from '@nestjs/common';
import { CVService } from './cv.service';
import { CVController } from './cv.controller';

@Module({
  controllers: [CVController],
  providers: [CVService],
})
export class CVModule {}
