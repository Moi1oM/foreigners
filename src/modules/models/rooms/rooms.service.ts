import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  async findRooms(user: User) {
    return this.roomsRepository
      .createQueryBuilder('room')
      .innerJoin('room.users', 'user', 'user.id = :userId', { userId: user.id })
      .getMany();
  }

  async create(user: User): Promise<Room> {
    const room = new Room();
    room.users = [user];

    return this.roomsRepository.save(room);
  }

  async findAll() {
    return await this.roomsRepository.find();
  }

  async findMessages(id: number) {
    const room = await this.roomsRepository.findOne({ where: { id: id } });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room.messages;
  }

  async findRoomById(id: number): Promise<Room> {
    const room = await this.roomsRepository.findOne({ where: { id: id } });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
