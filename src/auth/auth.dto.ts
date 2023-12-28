import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AuthDto {
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
  role: string;
}
