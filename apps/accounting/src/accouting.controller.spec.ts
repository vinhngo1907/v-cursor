import { Test, TestingModule } from '@nestjs/testing';
import { AccoutingController } from './accounting.controller';
import { AccoutingService } from './accounting.service';

describe('AccoutingController', () => {
    let accoutingController: AccoutingController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AccoutingController],
            providers: [AccoutingService],
        }).compile();

        accoutingController = app.get<AccoutingController>(AccoutingController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(accoutingController.getHello()).toBe('Hello World!');
        });
    });
});
