import { Module } from '@nestjs/common';
import { UsersController } from './messages.controller';
import { MessagesService } from './messages.service';
import { KafkaController } from './kafka.controller';
import { ConfigService } from '@nestjs/config';

@Module({
	controllers: [UsersController, KafkaController],
	providers: [MessagesService, ConfigService],
	exports: [MessagesService],
	// imports: []
})
export class MessagesModule { }
