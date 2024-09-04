import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './messages.dto';
import { MessagesRepo } from './messages.repo';

@Injectable()
export class MessagesService {
    constructor(private readonly subscriberRepository: MessagesRepo) { }
    async addSubscriber(CreateSubscriberDto: CreateSubscriberDto) {
        return this.subscriberRepository.create(CreateSubscriberDto)
    }

    async getAllSubscriber() {
        return this.subscriberRepository.getAll();
    }
}
