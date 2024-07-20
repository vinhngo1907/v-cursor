import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepoController } from './users-repo.controller';

describe('UsersRepoController', () => {
  let controller: UsersRepoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersRepoController],
    }).compile();

    controller = module.get<UsersRepoController>(UsersRepoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
