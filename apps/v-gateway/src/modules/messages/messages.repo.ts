import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { PrivateRoomQueryDto, RoomDataDto } from '@libs/v-dto';
@Injectable()
export class MessagesRepo {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) { }

    errorMessage: string = 'Oops something went wrong';

    async messagesRequest(method: string, url: string, param?: any) {
        try {
            const uri = `${this.configService.get<string>('API_MESSAGES')}${url}`;
            const response = await this.httpService.axiosRef?.[method](uri, param);
            return response.data;
        } catch (error) {
            if (error.response?.data?.statusCode === 400) {
                throw new BadRequestException(error.response.data.message);
            }
            throw new InternalServerErrorException(
                error.response?.data?.message || this.errorMessage,
            );
        }
    }

    async userRequest(method: string, url: string, param?: any) {
        try {
            const uri = `${this.configService.get<string>('API_USERS')}${url}`;
            const response = await this.httpService.axiosRef?.[method](uri, param);
            return response.data;
        } catch (error) {
            if (error.response?.data?.statusCode === 400) {
                throw new BadRequestException(error.response.data.message);
            }
            throw new InternalServerErrorException(
                error.response?.data?.message || this.errorMessage,
            );
        }
    }

    async getPrivateRoom(param: PrivateRoomQueryDto): Promise<RoomDataDto> {
        const { userIds } = param;
        const searchParam = new URLSearchParams(
            userIds.map((id) => ['userIds', id]),
        );
        let url = `/messages/get-private-room?${searchParam.toString()}`;

        return await this.messagesRequest('get', url);
    }
}
