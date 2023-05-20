import { Test, TestingModule } from '@nestjs/testing';
import { GptsService } from './gpts.service';

describe('GptsService', () => {
  let service: GptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GptsService],
    }).compile();

    service = module.get<GptsService>(GptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
