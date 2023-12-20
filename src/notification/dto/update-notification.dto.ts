import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationJobDto } from './create-notification.dto';

export class UpdateNotificationJobDto extends PartialType(
  CreateNotificationJobDto,
) {}
