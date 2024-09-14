import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { WebRegistrationParamDto, WebUserDto } from '@libs/v-dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
  } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/registration")
    @ApiTags('Authorization')
    @ApiOperation({ summary: 'Registration of new user' })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Success',
      type: WebUserDto,
    })
    async registration(@Body() body: WebRegistrationParamDto){

    }
}
