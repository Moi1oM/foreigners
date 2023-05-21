import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    example: '3',
    description: 'Room의 id값 입니다',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @ApiProperty({
    example: '안녕 외국인',
    description: '채팅 내용',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    example: 'text',
    description: 'text or image',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  type: string;
}
