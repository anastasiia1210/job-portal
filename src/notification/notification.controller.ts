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
import { NotificationJob } from "./notification.entity";

@Controller('notification')
export class NotificationJobController {
  constructor(
    private readonly notificationJobService: NotificationJobService,
  ) {}

  @Post()
  async create(@Body() createNotificationJobDto: CreateNotificationJobDto): Promise<NotificationJob> {
    return await this.notificationJobService.create(createNotificationJobDto);
  }

  @Get()
  async findAll(): Promise<NotificationJob[]> {
    return await this.notificationJobService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NotificationJob | undefined> {
    return await this.notificationJobService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNotificationJobDto: UpdateNotificationJobDto,
  ): Promise<NotificationJob> {
    return await this.notificationJobService.update(id, updateNotificationJobDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<NotificationJob> {
    return await this.notificationJobService.remove(id);
  }

  @Get('seeker/:id')
  async findAllofOneSeeker(@Param('id') id: string): Promise<NotificationJob[]> {
    return await this.notificationJobService.findAllofOneSeeker(id);
  }
}
