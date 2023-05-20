import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GoogleLoginDto {
  @ApiProperty({
    example: 'foreig@google.com',
    description: '이메일',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '........accesstoken',
    description: '구글 어세스 토큰',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    example: 'google',
    description: '어디 소셜 로그인?',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  vendor: string;

  @ApiProperty({
    example:
      'https://velog.velcdn.com/images/hclou0806/profile/d4697cef-6173-43eb-b60a-fa9bb447722d/social_profile.png',
    description: '프로필 이미지',
    required: false,
  })
  photo_url: string;

  @ApiProperty({
    example: 'male',
    description: 'male, femal, nonselect 중 1개',
    required: false,
  })
  gender: string;

  @ApiProperty({
    example: 'korea',
    description: 'default는 korea',
    required: false,
  })
  country: string;

  @ApiProperty({
    example: '2008-04-28-00.00.00',
    description: '마지막 접속 시간',
    required: false,
  })
  last_login: string;
}
