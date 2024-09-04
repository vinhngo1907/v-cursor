import { Controller } from '@nestjs/common';
import { MessagesService } from './messages.service';
import {
    MessagePattern, Payload,
} from '@nestjs/microservices';
import { CreateSubscriberDto } from './messages.dto';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }
    
    @MessagePattern({ cmd: "add-subscriber" })
    async addSubscriber(@Payload() createSubscriberDto: CreateSubscriberDto) {
        return this.messagesService.addSubscriber(createSubscriberDto)
    }

    @MessagePattern({ cmd: 'get-all-subscriber' })
    async getAllSubscriber() {
        return this.messagesService.getAllSubscriber();
    }
}