import { Injectable } from '@nestjs/common';
import { UsersCreateDto, UsersUpdateDto } from './users.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { FindAllDto, FindByIdDto, WebUserDto, WebUsersAllDto } from '@libs/v-dto';
import { UsersRepo } from './users.repo';

@Injectable()
export class UsersService {
    constructor(private usersRepo: UsersRepo) { }

    async getUser(): Promise<any> {
        return true;
    }

    async createUser(createUser: UsersCreateDto): Promise<any> {
        return true;
    }

    async findAll(param: FindAllDto, user: WebUserDto): Promise<WebUsersAllDto> {
        param.excludeIds = [user.id];
        return this.usersRepo.findAll(param);
    }

    async findUserById(param: FindByIdDto): Promise<WebUserDto> {
        const { id, login, email, active, created_at } =
            await this.usersRepo.findUserById(param);
        return { id, login, email, active, created_at };
    }
}
