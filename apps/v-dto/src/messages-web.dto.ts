import { Test, TestingModule } from '@nestjs/testing';
import { SheetController } from './messages.dto';
import { SheetService } from './user.dto';

describe('SheetController', () => {
  let sheetController: SheetController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SheetController],
      providers: [SheetService],
    }).compile();

    sheetController = app.get<SheetController>(SheetController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sheetController.getHello()).toBe('Hello World!');
    });
  });
});
