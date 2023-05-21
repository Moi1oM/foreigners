import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/commons/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/modules/functions/auth/jwt/jwt.guard';
import { User } from '../users/entities/user.entity';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiOperation({
    description: '룸 생성 API',
    summary: 'room create : needs accessToken',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@CurrentUser() user: User) {
    return this.roomsService.create(user);
  }

  @ApiOperation({
    description: '유저에 관계 없이 모든 채팅방 가져오기.',
    summary: 'find all rooms',
  })
  @Get('all')
  findAll() {
    return this.roomsService.findAll();
  }

  @ApiOperation({
    description: '유저의 채팅방들 가져오기, accessToken만 넣어주세요.',
    summary: 'room for specific user',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user')
  roomForUser(@CurrentUser() user: User) {
    return this.roomsService.findRooms(user);
  }

  @ApiOperation({
    description: '채팅방의 id를 통해서 채팅방의 Messages 가져오기',
    summary: 'get messages',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findMessages(+id);
  }

  @ApiOperation({
    deprecated: true,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @ApiOperation({
    deprecated: true,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
