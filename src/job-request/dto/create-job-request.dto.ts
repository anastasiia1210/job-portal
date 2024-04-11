import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateJobRequestDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsBoolean()
  status: boolean | null;

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
