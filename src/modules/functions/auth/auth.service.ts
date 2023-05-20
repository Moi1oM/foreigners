import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { UsersService } from 'src/modules/models/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data) {
    let userData;
    // console.log('data', data);
    switch (data.vendor) {
      case 'google': {
        userData = await this.getUserByGoogleAccessToken(data.accessToken);
        break;
      }
      default: {
        throw new UnauthorizedException('invalid vendor'); //소셜로그인 선택 실패 예외처리
      }
    }
    // console.log('userData', userData);
    const payload = {
      email: userData.email,
      name: userData.name,
      sub: userData.userId,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      userData,
    };
  }

  async getUserByGoogleAccessToken(token: string) {
    const user: any = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (!user) {
      throw new UnauthorizedException('유효하지 않은 구글 액세스 토큰');
    }
    // console.log('logging', user);
    const userId = await this.usersService.findOneByEmail(user.data.email);
    if (!userId) {
      const dataForCreateUser = {
        email: user.data.email,
        name: user.data.name,
      };
      const newUser = await this.usersService.socialCreate(dataForCreateUser);
      await this.usersService.updateLastLogin(newUser);
      return newUser;
    }
    await this.usersService.updateLastLogin(userId);
    return userId;
  }
}
