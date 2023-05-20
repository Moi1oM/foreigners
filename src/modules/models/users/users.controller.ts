import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleLoginDto } from './dto/google-login.dto';
import { AuthService } from 'src/modules/functions/auth/auth.service';
import { dataCreateByLeastDto } from './dto/data-create-by-least.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    description: '구글 소셜 로그인',
    summary: '소셜로그인',
  })
  @Post()
  async create(@Body() loginDatas: GoogleLoginDto) {
    console.log(loginDatas, 'datatatas');
    return await this.authService.login(loginDatas);
  }

  @ApiOperation({
    description: '계정 만들기',
    summary: '가장 적은 정보로 계정 만들기',
    deprecated: true,
  })
  @Post('/least')
  async leastCreate(@Body() datas: dataCreateByLeastDto) {
    return await this.usersService.leastCreate(datas);
  }

  @ApiOperation({
    deprecated: true,
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    deprecated: true,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({
    deprecated: true,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({
    deprecated: true,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
