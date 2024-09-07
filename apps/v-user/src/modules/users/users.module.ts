import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepoModule } from '../users-repo/users-repo.module';
import { UsersHelper } from './users.helper';
import { KafkaController } from './kafka.controller';
import { ConfigService } from '@nestjs/config';
import { UsersRepoService } from '../users-repo/users-repo.service';

@Module({
	imports: [UsersRepoModule],
	controllers: [UsersController, KafkaController],
	providers: [UsersService, UsersHelper, ConfigService,
		UsersRepoService
	],
	exports: [UsersService],
})
export class UsersModule { }
