import { PrivateRoomQueryDto, RoomDataDto } from '@libs/v-dto';
import { Controller, Get, HttpStatus, Query, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from 'src/pipes/joi.validation.pipe';
import { privateRoomQueryJoi } from './messages.joi';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) { }

    @Get('/get-private-room')
    @ApiOperation({ summary: 'Get user by id' })
    @ApiTags('Users')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success',
        type: RoomDataDto,
    })
    @UsePipes(new JoiValidationPipe(privateRoomQueryJoi))
    getPrivateRoom(@Query() params: PrivateRoomQueryDto): Promise<RoomDataDto> {
        return this.messagesService.getPrivateRoom(params);
    }
}
