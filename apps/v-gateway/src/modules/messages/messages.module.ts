import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Module({
	imports: [HttpModule],
	controllers: [],
	providers: [MessagesService],
	exports: [MessagesService]
})
export class MessagesModule { }