import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class dataCreateByLeastDto {
  @ApiProperty({
    example: 'foreig@google.com',
    description: '이메일',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'sw',
    description: '이름',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
