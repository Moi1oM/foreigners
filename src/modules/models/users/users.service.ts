import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { dataCreateByLeastDto } from './dto/data-create-by-least.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async leastCreate(datas: dataCreateByLeastDto) {
    const user = await this.usersRepository.create(datas);
    return user;
  }

  async updateLastLogin(user: User) {
    user.last_login = new Date();
    await user.save();
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    return user;
  }

  async socialCreate(data) {
    const newData = {
      email: data.email,
      name: data.name,
    };
    return this.usersRepository.save(newData);
  }

  async create(data) {
    return await this.usersRepository.save(data);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
