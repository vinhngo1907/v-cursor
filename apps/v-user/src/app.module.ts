import { Module } from '@nestjs/common';
import { AccoutingController } from './app.controller';
import { AccoutingService } from './app.service';
import { UsersRepoModule } from './users-repo/users-repo.module';
import { UsersModule } from './users/users.module';
import { UsersRepoModule } from './users-repo/users-repo.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersRepoModule, UsersModule],
  controllers: [AccoutingController, UsersController],
  providers: [AccoutingService],
})
export class AccoutingModule {}
