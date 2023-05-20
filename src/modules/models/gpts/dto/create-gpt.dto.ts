import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, isString } from 'class-validator';

export class CreateGptDto {
  @ApiProperty({
    example: 'john',
    description: '이름',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example:
      'https://velog.velcdn.com/images/hclou0806/profile/d4697cef-6173-43eb-b60a-fa9bb447722d/social_profile.png',
    description: '프로필 이미지',
    required: false,
  })
  profile_img: string;

  @ApiProperty({
    example: 'hi im john',
    description: '프롬프트',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  prompt: string;
}
