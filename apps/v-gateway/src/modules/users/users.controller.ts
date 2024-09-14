import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Request, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersCreateDto } from './users.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { FindAllDto, FindByIdDto, WebUserDto, WebUsersAllDto } from '@libs/v-dto';
import { JoiValidationPipe } from 'src/infrastructure/pipes/joi.validation';
import { JwtAuthGuard } from 'src/infrastructure/jwt/guard/jwt-auth.guard';
import { findAllJoi, findByIdJoi } from './user.joi';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('/find-all')
    @ApiTags('Users')
    @ApiOperation({ summary: 'List of users' })
    @ApiBearerAuth('JWT')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success',
        type: WebUsersAllDto,
    })
    @UseGuards(JwtAuthGuard)
    @UsePipes(new JoiValidationPipe(findAllJoi))
    findAll(
        @Query() params: FindAllDto,
        @Request() req,
    ): Promise<WebUsersAllDto> {
        return this.usersService.findAll(params, req.user);
    }

    @Get('/find-one/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new JoiValidationPipe(findByIdJoi))
    @ApiTags('Users')
    @ApiOperation({ summary: 'Get user by id' })
    @ApiBearerAuth('JWT')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success',
        type: WebUserDto,
    })
    findOne(@Param() params: FindByIdDto): Promise<WebUserDto> {
        return this.usersService.findUserById(params);
    }
}