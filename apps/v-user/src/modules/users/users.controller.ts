import { BadRequestException, Body, Controller, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WebLoginParamDto, WebRegistrationParamDto, WebUserDto } from '@libs/v-dto';
import { JoiValidationPipe } from 'src/pipes/joi.validation.pipe';
import { loginJoi, registrationJoi } from './users.joi';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post("/login")
    @ApiTags('Authorization')
    @ApiOperation({ summary: "Login" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Success",
        type: WebUserDto
    })
    @UsePipes(new JoiValidationPipe(loginJoi))
    async login(@Body() body: WebLoginParamDto): Promise<WebUserDto> {
        return this.usersService.login(body);
    }

    @Post("register")
    @ApiTags('Authorization')
    @ApiOperation({ summary: 'Registration of new user' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Success',
        type: WebUserDto,
    })
    @UsePipes(new JoiValidationPipe(registrationJoi))
    async register(@Body() body: WebRegistrationParamDto): Promise<WebUserDto> {
        try {
            return this.usersService.registratiion(body);
        } catch (error) {
            if (error?.code === 11000) {
                throw new BadRequestException('Duplicate user', {
                    cause: error,
                    description: 'User with same login or email already exists'
                });
            }

            throw new BadRequestException(error.message, {
                cause: error,
                description: error.message,
            });
        }
    }

}
