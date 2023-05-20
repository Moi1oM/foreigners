import { Module } from '@nestjs/common';
import { GptsService } from './gpts.service';
import { GptsController } from './gpts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gpt } from './entities/gpt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gpt])],
  controllers: [GptsController],
  providers: [GptsService],
})
export class GptsModule {}
