import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './subscriber.dto';
import { SubscriberRepository } from './subscriber.respository';

@Injectable()
export class SubscriberService {
    constructor(private readonly subscriberRepository: SubscriberRepository) { }
    async addSubscriber(CreateSubscriberDto: CreateSubscriberDto) {
        return this.subscriberRepository.create(CreateSubscriberDto)
    }

    async getAllSubscriber() {
        return this.subscriberRepository.getAll();
    }
}
