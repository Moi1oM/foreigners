import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GptsService } from './gpts.service';
import { CreateGptDto } from './dto/create-gpt.dto';
import { UpdateGptDto } from './dto/update-gpt.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('gpts')
@Controller('gpts')
export class GptsController {
  constructor(private readonly gptsService: GptsService) {}

  @ApiOperation({
    description: 'GPT인간 만들기',
    summary: 'new Gpt',
  })
  @Post()
  create(@Body() createGptDto: CreateGptDto) {
    return this.gptsService.create(createGptDto);
  }

  @ApiOperation({
    description: 'GPT인간 조회하기',
    summary: 'findAll gpt',
  })
  @Get()
  findAll() {
    return this.gptsService.findAll();
  }

  @ApiOperation({
    description: '이름으로 GPT인간 찾기',
    summary: 'find gpt by name',
  })
  @Get(':name')
  findOneName(@Param('name') name: string) {
    return this.gptsService.findOneByName(name);
  }

  @ApiOperation({
    deprecated: true,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gptsService.findOne(+id);
  }

  @ApiOperation({
    deprecated: true,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGptDto: UpdateGptDto) {
    return this.gptsService.update(+id, updateGptDto);
  }

  @ApiOperation({
    deprecated: true,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gptsService.remove(+id);
  }
}
