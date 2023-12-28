import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateEmployerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  position: string;

  @IsOptional()
  @IsBoolean()
  approved?: boolean;

  @IsNotEmpty()
  @IsString()
  companyId: string;
}
