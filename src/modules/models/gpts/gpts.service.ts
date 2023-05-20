import { Injectable } from '@nestjs/common';
import { CreateGptDto } from './dto/create-gpt.dto';
import { UpdateGptDto } from './dto/update-gpt.dto';
import { Gpt } from './entities/gpt.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GptsService {
  constructor(
    @InjectRepository(Gpt)
    private gptsRepository: Repository<Gpt>,
  ) {}

  async create(createGptDto: CreateGptDto) {
    return await this.gptsRepository.save(createGptDto);
  }

  async findAll() {
    return await this.gptsRepository.find();
  }

  async findOneByName(name: string) {
    return await this.gptsRepository.findOne({ where: { name: name } });
  }

  async findOne(id: number) {
    return `This action returns a #${id} gpt`;
  }

  update(id: number, updateGptDto: UpdateGptDto) {
    return `This action updates a #${id} gpt`;
  }

  remove(id: number) {
    return `This action removes a #${id} gpt`;
  }
}
