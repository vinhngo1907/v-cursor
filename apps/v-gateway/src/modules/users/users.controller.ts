import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersCreateDto } from './users.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    addUser(@Body() usersCreateDto: UsersCreateDto) {
        return this.usersService.createUser(usersCreateDto)
    }

    @Get()
    getUsers(): Promise<any> {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUser(@Param() id: number): Promise<void> {
        return this.usersService.findUserById(id);
    }
}