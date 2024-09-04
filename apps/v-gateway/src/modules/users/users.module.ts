import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios"
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepo } from './users.repo';

@Module({
	imports: [HttpModule],
	providers: [UsersService, UsersRepo],
	controllers: [UsersController],
})
export class UsersModule { }
