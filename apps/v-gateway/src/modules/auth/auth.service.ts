import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthRepo } from './auth.repo';
import { JwtService } from '@nestjs/jwt';
import { WebUserDto } from '@libs/v-dto';
import { WebAccessTokens } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService,
        private authRepo: AuthRepo,
    ) { }
    errorMessage: string = 'Oops something went wrong';

    private async getTokens(user:WebUserDto) :Promise<WebAccessTokens>{}
}
