import { Injectable } from '@nestjs/common';
import { CreateNotificationJobDto } from './dto/create-notification.dto';
import { UpdateNotificationJobDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationJobService {
  create(createNotificationJobDto: CreateNotificationJobDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationJobDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
