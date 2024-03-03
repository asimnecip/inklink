import { Test, TestingModule } from '@nestjs/testing';
import { CanvasGateway } from './canvas.gateway';

describe('CanvasGateway', () => {
  let gateway: CanvasGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CanvasGateway],
    }).compile();

    gateway = module.get<CanvasGateway>(CanvasGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
