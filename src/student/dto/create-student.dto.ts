import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  age: number;
}
