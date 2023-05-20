import { Test, TestingModule } from '@nestjs/testing';
import { GptsController } from './gpts.controller';
import { GptsService } from './gpts.service';

describe('GptsController', () => {
  let controller: GptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GptsController],
      providers: [GptsService],
    }).compile();

    controller = module.get<GptsController>(GptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
