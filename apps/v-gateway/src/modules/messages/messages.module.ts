import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
    imports: [HttpModule],
    controllers: [MessagesController],
      providers: [MessagesService],
      exports: [MessagesService]
})
export class MessagesModule { }