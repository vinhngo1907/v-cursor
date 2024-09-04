import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './messages.schema';
import { MessageWebDto, RoomWebDto, UserRoomQueryDto } from '@libs/v-dto';

@Injectable()
export class MessagesRepoService {
    constructor(
        @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    ) { }

    getWebRoomDto(roomDoc: RoomDocument): RoomWebDto {
        const { _id, user_ids, created_at, type } = roomDoc;

        return {
            id: _id.toString(),
            user_ids: user_ids.map((id) => id.toString()),
            type,
            created_at
        }
    }

    async getPrivateRoom(params: UserRoomQueryDto): Promise<void> { }

    async saveMessage(param: MessageWebDto): Promise<MessageWebDto | undefined> {
        const { uuid, message, room_id, user_id, created_at } = param;
        const newMessage: MessageDocument = new this.messageModel({
            uuid, message, room_id, user_id, created_at
        });

        await newMessage.save();

        return this.getWebMessageDto(newMessage);
    }

    getWebMessageDto(messageDoc: MessageDocument): MessageWebDto {
        const { _id, user_id, created_at, message, room_id, uuid } = messageDoc;
        return {
            id: _id.toString(),
            uuid,
            message,
            room_id: room_id.toString(),
            user_id: user_id.toString(),
            created_at,
        };
    }

    async getUserRoom(params: UserRoomQueryDto): Promise<any> {
        const { id, user_id } = params;
        const room: RoomDocument = await this.roomModel.findOne({
            id, user_ids: user_id,
        });

        return room ? this.getWebRoomDto(room) : room;
    }

}
