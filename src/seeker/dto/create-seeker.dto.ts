import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class CreateSeekerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  telegram?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  image?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  city: string;

  @IsNotEmpty()
  @IsDateString()
  birthday: Date;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  gender: string;

  @IsOptional()
  @IsBoolean()
  militaryExperience?: boolean;

  @IsOptional()
  @IsBoolean()
  militaryWork?: boolean;
}
