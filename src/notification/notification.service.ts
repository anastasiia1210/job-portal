import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNotificationJobDto } from './dto/create-notification.dto';
import { UpdateNotificationJobDto } from './dto/update-notification.dto';
import { Seeker } from '../seeker/seeker.entity';
import { JobRequest } from '../job-request/job-request.entity';
import { NotificationJob } from './notification.entity';

@Injectable()
export class NotificationJobService {
  async create(
    createNotificationJobDto: CreateNotificationJobDto,
  ): Promise<NotificationJob> {
    try {
      const seeker = await Seeker.findOneOrFail(
        createNotificationJobDto.seekerId,
      );
      const jobRequest = await JobRequest.findOneOrFail(
        createNotificationJobDto.jobRequestId,
      );

      const notification = NotificationJob.create(createNotificationJobDto);
      notification.seeker = seeker;
      notification.jobRequest = jobRequest;
      return await notification.save();
    } catch (error) {
      throw new HttpException(
        `Seeker or job request not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<NotificationJob[]> {
    const notifications: NotificationJob[] = await NotificationJob.find({
      relations: ['seeker', 'jobRequest'],
    });
    return notifications;
  }

  async findOne(id: string): Promise<NotificationJob | undefined> {
    try {
      return await NotificationJob.findOne(id, {
        relations: ['seeker', 'jobRequest'],
      });
    } catch (error) {
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(
    id: string,
    updateNotificationDto: UpdateNotificationJobDto,
  ): Promise<NotificationJob> {
    const notification = await NotificationJob.findOne(id);
    if (!notification) {
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    }
    try {
      Object.assign(notification, updateNotificationDto);
      if (updateNotificationDto.seekerId) {
        const seeker = await Seeker.findOneOrFail(
          updateNotificationDto.seekerId,
        );
        notification.seeker = seeker;
      }
      if (updateNotificationDto.jobRequestId) {
        const jobRequest = await JobRequest.findOneOrFail(
          updateNotificationDto.jobRequestId,
        );
        notification.jobRequest = jobRequest;
      }
      return await NotificationJob.save(notification);
    } catch (error) {
      throw new HttpException(
        'Seeker or job request not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string): Promise<NotificationJob> {
    try {
      const notification: NotificationJob | undefined =
        await NotificationJob.findOne(id);
      await notification.remove();
      return notification;
    } catch (error) {
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAllofOneSeeker(id: string): Promise<NotificationJob[]> {
    const notifications: NotificationJob[] = await NotificationJob.find({
      where: {
        seeker: { id: id },
      },
      relations: ['jobRequest'],
    });

    return notifications;
  }
}
