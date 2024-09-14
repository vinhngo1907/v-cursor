import { Injectable } from '@nestjs/common';
import { MessagesRepo } from './messages.repo';
import { FindByIdsDto, PrivateRoomQueryDto, RoomDataDto, WebUsersAllDto } from '@libs/v-dto';

@Injectable()
export class MessagesService {
    constructor(private messagesRepo: MessagesRepo) { }

    async getPrivateRoom(param: PrivateRoomQueryDto): Promise<RoomDataDto> {
        return this.messagesRepo.getPrivateRoom(param);
    }
    async getUsersByIds(param: FindByIdsDto): Promise<WebUsersAllDto> {
        return this.messagesRepo.getUsersByIds(param);
    }
}
