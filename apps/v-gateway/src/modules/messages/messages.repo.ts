import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber } from "../../../../v-client/src/dto/messages.joi";
import { ObjectId } from 'mongodb';
import { CreateSubscriberDto } from '../../../../v-client/src/dto/messages';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class MessagesRepo {
    constructor(
        @InjectModel('Subscriber')
        private readonly subscriber: Model<Subscriber>,
        private configSerivce: ConfigService,
        private httpService: HttpService
    ) { }

    errorMessage: string = 'Oops something went wrong';
    
    async create(doc): Promise<any> {
        doc._id = new ObjectId();
        return await new this.subscriber(doc).save();
    }

    async getAll() {
        return this.subscriber.find();
    }
}
