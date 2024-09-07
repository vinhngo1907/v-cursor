import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { messageAnalysisDto, PrivateRoomQueryDto, RoomDataDto } from '@libs/v-dto';
import { MessageWebDto, RoomWebDto } from '@libs/v-dto';
import { MessagesRepoService } from '../messages-repo/messages-repo.service';
import { RoomDocument } from '../messages-repo/room.schema';
// import { UsersRepoService } from '../users-repo/users-repo.service';

@Injectable()
export class MessagesService {
    constructor(

        private messagesRepoService: MessagesRepoService,
    ) { }

    async receiveAnalysis(params: {
        id: string,
        analysis: messageAnalysisDto
    }): Promise<any> {

    }

    async receiveMessage(params: MessageWebDto) {
        const { id, user_id } = params;
        const messageRoom: RoomWebDto = await this.messagesRepoService.getUserRoom({
            id, user_id
        });
        if (!messageRoom) {
            throw new ForbiddenException(`Room ${id} forbidden for user ${user_id}`);
        }
        const newMessage = await this.messagesRepoService.saveMessage(params);
        return newMessage;
    }

    async getPrivateRoom(
        param: PrivateRoomQueryDto,
    ): Promise<RoomDataDto | undefined> {
        let privateRoom = await this.messagesRepoService.getPrivateRoom(param);

        if (!privateRoom)
            privateRoom = await this.messagesRepoService.createPrivateRoom(param);

        const messages = await this.messagesRepoService.getRoomMessages({
            roomId: privateRoom.id,
        });

        return {
            room: privateRoom,
            messages: messages?.reverse(),
        };
    }
}
