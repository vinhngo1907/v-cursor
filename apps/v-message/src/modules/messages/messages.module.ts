import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { KafkaController } from './kafka.controller';
import { ConfigService } from '@nestjs/config';
import { MessagesRepoModule } from '../messages-repo/messages-repo.module';

@Module({
	imports: [MessagesRepoModule],
	controllers: [MessagesController, KafkaController],
	providers: [MessagesService, ConfigService],
	exports: [MessagesService],
})
export class MessagesModule { }
