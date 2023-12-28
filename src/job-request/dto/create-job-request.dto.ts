import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateJobRequestDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsUUID()
  seekerId: string;

  @IsNotEmpty()
  @IsUUID()
  jobOfferId: string;

  @IsNotEmpty()
  @IsUUID()
  cvId: string;
}
