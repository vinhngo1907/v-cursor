import { Injectable } from '@nestjs/common';
import { UsersCreateDto, UsersUpdateDto } from './users.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
    constructor(
        private configService: ConfigService,
        private user: HttpService
    ){}

    async getUser(): Promise<any> {
        return true;
    }

    async createUser(createUser: UsersCreateDto): Promise<any> {
       return true;
    }

    async getAllUsers() {
        return true;
    }

    async findUserById(id: number): Promise<any> {
       return true;
    }
}
