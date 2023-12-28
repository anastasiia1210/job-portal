import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

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
  @IsString()
  description: string;
}
