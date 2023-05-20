import { Module } from '@nestjs/common';
import { GptsService } from './gpts.service';
import { GptsController } from './gpts.controller';

@Module({
  controllers: [GptsController],
  providers: [GptsService]
})
export class GptsModule {}
