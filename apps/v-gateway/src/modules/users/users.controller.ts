import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersCreateDto, UsersUpdateDto } from './users.dto';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    addUser(@Body() usersCreateDto: UsersCreateDto) {
        return this.usersService.createUser(usersCreateDto)
    }

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUser(@Param() id: number): Promise<User> {
        return this.usersService.findUserById(id);
    }

    @Delete(':id')
    deleteUser(@Param()id : number): Promise<String>{
        return this.usersService.deleteUserById(id);
    }

    @Put('id')
    updateUser(@Param()id: number, @Body() usersUpdateDto: UsersUpdateDto):Promise<User>{
        return this.usersService.updateUserById(id, usersUpdateDto);
    }
}