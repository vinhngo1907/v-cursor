import { Controller } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import {
    MessagePattern, Payload,
} from '@nestjs/microservices';
import { CreateSubscriberDto } from './subscriber.dto';

@Controller('subscriber')
export class SubscriberController {
    constructor(private readonly subscriberService: SubscriberService) { }
    
    @MessagePattern({ cmd: "add-subscriber" })
    async addSubscriber(@Payload() createSubscriberDto: CreateSubscriberDto) {
        return this.subscriberService.addSubscriber(createSubscriberDto)
    }

    @MessagePattern({ cmd: 'get-all-subscriber' })
    async getAllSubscriber() {
        return this.subscriberService.getAllSubscriber();
    }
}