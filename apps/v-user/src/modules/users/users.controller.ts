import { Body, Controller, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WebLoginParamDto, WebUserDto } from '@libs/v-dto';
import { JoiValidationPipe } from 'src/pipes/joi.validation.pipe';
import { loginJoi } from './users.joi';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    @ApiTags('Authorization')
    @ApiOperation({ summary: "Login" })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Success",
        type: WebUserDto
    })
    @UsePipes(new JoiValidationPipe(loginJoi))
    async login(@Body() body: WebLoginParamDto) : Promise<WebUserDto> {
        return this.usersService.login(body);
    }

}
