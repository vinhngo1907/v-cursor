import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios"
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepo } from './users.repo';
import { ConfigService } from '@nestjs/config';
@Module({
	imports: [HttpModule],
	providers: [UsersService, UsersRepo, ConfigService],
	controllers: [UsersController],
})
export class UsersModule { }
