import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateJobCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;
}
