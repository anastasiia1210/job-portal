import {
  IsBoolean, IsDate,
  IsInt,
  IsNotEmpty, IsOptional,
  IsString,
  IsUUID
} from "class-validator";

export class CreateJobOfferDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  salary: number;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  duties: string;

  @IsNotEmpty()
  @IsString()
  requirements: string;

  @IsNotEmpty()
  @IsString()
  conditions: string;

  @IsBoolean()
  militaryWork?: boolean;

  @IsOptional()
  @IsDate()
  postingDate?: Date;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @IsUUID()
  companyId: string;
}
