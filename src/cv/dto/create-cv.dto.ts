import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCVDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  education?: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsString()
  skills?: string;

  @IsOptional()
  @IsString()
  cvLink?: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsUUID()
  @IsNotEmpty()
  seekerId: string;
}
