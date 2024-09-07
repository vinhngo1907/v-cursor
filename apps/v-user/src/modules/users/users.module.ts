import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepoModule } from '../users-repo/users-repo.module';
import { UsersHelper } from './users.helper';
import { KafkaController } from './kafka.controller';

@Module({
	imports: [UsersRepoModule],
	controllers: [UsersController, KafkaController],
	providers: [UsersService, UsersHelper],
	exports: [UsersService],
})
export class UsersModule { }
