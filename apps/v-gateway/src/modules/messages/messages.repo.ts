import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber } from "./messages.joi";
import { ObjectId } from 'mongodb';
import { CreateSubscriberDto } from './messages.dto';
@Injectable()
export class SubscriberRepository {
    constructor(
        @InjectModel('Subscriber')
        private readonly subscriber: Model<Subscriber>,
    ) { }
    async create(doc): Promise<any> {
        doc._id = new ObjectId();
        return await new this.subscriber(doc).save();
    }

    async getAll() {
        return this.subscriber.find();
    }
}
