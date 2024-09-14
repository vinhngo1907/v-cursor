import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesRepo } from './messages.repo';
import { MessagesGateway } from './messages.gateway';
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [HttpModule],
	providers: [MessagesGateway, MessagesService, MessagesRepo, ConfigService],
})
export class MessagesModule { }