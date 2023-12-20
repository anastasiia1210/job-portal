import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationJobService } from './notification.service';
import { CreateNotificationJobDto } from './dto/create-notification.dto';
import { UpdateNotificationJobDto } from './dto/update-notification.dto';

@Controller('notification')
export class NotificationJobController {
  constructor(
    private readonly notificationJobService: NotificationJobService,
  ) {}

  @Post()
  create(@Body() createNotificationJobDto: CreateNotificationJobDto) {
    return this.notificationJobService.create(createNotificationJobDto);
  }

  @Get()
  findAll() {
    return this.notificationJobService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationJobService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationJobDto: UpdateNotificationJobDto,
  ) {
    return this.notificationJobService.update(+id, updateNotificationJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationJobService.remove(+id);
  }
}
