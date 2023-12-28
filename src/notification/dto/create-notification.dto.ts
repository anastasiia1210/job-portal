import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateNotificationJobDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsNotEmpty()
  @IsUUID()
  jobRequestId: string;

  @IsNotEmpty()
  @IsUUID()
  seekerId: string;
}
