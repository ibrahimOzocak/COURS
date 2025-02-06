import { Test, TestingModule } from '@nestjs/testing';
import { JeTesteController } from './je-teste.controller';

describe('JeTesteController', () => {
  let controller: JeTesteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JeTesteController],
    }).compile();

    controller = module.get<JeTesteController>(JeTesteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
