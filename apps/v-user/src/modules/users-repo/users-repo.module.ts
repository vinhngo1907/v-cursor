import { Module } from '@nestjs/common';
import { UsersRepoController } from './users-repo.controller';
import { UsersRepoService } from './users-repo.service';

@Module({
  controllers: [UsersRepoController],
  providers: [UsersRepoService]
})
export class UsersRepoModule {}
