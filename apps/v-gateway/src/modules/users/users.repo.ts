import { HttpService } from '@nestjs/axios';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class UsersRepo {
    constructor(
        private configService: ConfigService,
        private readonly httpService: HttpService
    ) { }

    errorMessage: string = 'Oops something went wrong';

    async usersRequest(method: string, url: string, param?: any) {
        try {

        } catch (error) {

        }
    }
}