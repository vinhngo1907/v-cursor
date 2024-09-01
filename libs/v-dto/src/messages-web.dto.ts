import { ApiProperty } from '@nestjs/swagger';

export class RoomWebDto {
	@ApiProperty({ description: 'Id of room', required: true })
	id?: string;

	@ApiProperty({ description: 'Type of room', required: true })
	type: string;

	@ApiProperty({ description: 'List of user ids', required: true })
	user_ids: string[];

	@ApiProperty({ description: 'Date of creation', required: false })
	created_at?: Date;
}

export class MessageWebDto {
	@ApiProperty({ description: 'Id of message', required: false })
	id?: string;

	@ApiProperty({ description: 'uuid of message', required: true })
	uuid: string;

	@ApiProperty({ description: 'Text of message', required: true })
	message: string;

	@ApiProperty({ description: 'Id of room', required: true })
	room_id: string;

	@ApiProperty({ description: 'Id of user', required: true })
	user_id: string;

	@ApiProperty({ description: 'Date of creation', required: false })
	created_at?: Date;
}

export class PrivateRoomQueryDto {
	@ApiProperty({ description: 'Ids of user' })
	userIds: string[];
}

export class UserRoomQueryDto {
	@ApiProperty({ description: 'Id of chat room' })
	id: string;
	@ApiProperty({ description: 'Id of user' })
	user_id: string;
}

export class RoomDataDto {
	@ApiProperty({ description: 'Message room' })
	room: RoomWebDto;
	@ApiProperty({ description: 'Messages' })
	messages: MessageWebDto[];
}