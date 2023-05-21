import { RoomsService } from './../rooms/rooms.service';
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { Room } from '../rooms/entities/room.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    private roomsService: RoomsService,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const { roomId, content, type } = createMessageDto;
    const room = await this.roomsService.findRoomById(+roomId);
    const newMessage = new Message();
    newMessage.content = content;
    newMessage.type = type;
    newMessage.room = room;
    return await this.messagesRepository.save(newMessage);
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
