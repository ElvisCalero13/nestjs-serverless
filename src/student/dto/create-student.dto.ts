import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class CreateStudentDto {
  @ApiProperty({
    description: 'only numbers',
    minimum: 10,
    maximum: 10,
  })
  @IsString()
  @IsNotEmpty()
  dni: string;
  @ApiProperty({
    description: 'only letters, write two names',
    minimum: 10,
    maximum: 10,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'only letters, write two lastname',
    minimum: 10,
    maximum: 10,
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @ApiProperty({
    description: 'only letters, write fullname career',
    minimum: 10,
    maximum: 10,
  })
  @IsString()
  @IsNotEmpty()
  career: string;
  @ApiProperty({
    description: 'only numbers, write number of semester',
    minimum: 10,
    maximum: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  level: number;
}
