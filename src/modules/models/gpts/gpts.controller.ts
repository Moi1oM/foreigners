import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GptsService } from './gpts.service';
import { CreateGptDto } from './dto/create-gpt.dto';
import { UpdateGptDto } from './dto/update-gpt.dto';

@Controller('gpts')
export class GptsController {
  constructor(private readonly gptsService: GptsService) {}

  @Post()
  create(@Body() createGptDto: CreateGptDto) {
    return this.gptsService.create(createGptDto);
  }

  @Get()
  findAll() {
    return this.gptsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gptsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGptDto: UpdateGptDto) {
    return this.gptsService.update(+id, updateGptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gptsService.remove(+id);
  }
}
