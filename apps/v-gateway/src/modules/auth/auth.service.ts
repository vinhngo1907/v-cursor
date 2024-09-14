import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthRepo } from './auth.repo';
import { JwtService } from '@nestjs/jwt';
import { WebLoginParamDto, WebRegistrationParamDto, WebUserDto } from '@libs/v-dto';
import { WebAccessTokens } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService,
        private authRepo: AuthRepo,
    ) { }
    errorMessage: string = 'Oops something went wrong';

    private async getTokens(user: WebUserDto): Promise<WebAccessTokens> {
        const { login, id, email, created_at, active } = user;

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                { id, login, email, active, created_at },
                {
                    secret: this.configService.get<string>('JWT_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_EXPIRES'),
                }
            ),
            this.jwtService.signAsync(
                { id, login, email, active, created_at },
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES'),
                },
            )
        ]);

        return { accessToken, refreshToken };
    }

    async registration(registrationDto: WebRegistrationParamDto): Promise<WebUserDto> {
        const { id, email, created_at, login, active } = await this.authRepo.registration(registrationDto);
        return { id, email, created_at, login, active };
    }

    async login(loginDto: WebLoginParamDto): Promise<WebAccessTokens> {
        const { active, created_at, email, id, login } = await this.authRepo.login(loginDto);
        const { accessToken, refreshToken } = await this.getTokens({ active, created_at, email, id, login });
        return { accessToken, refreshToken };
    }

    async refresh(user: WebUserDto): Promise<WebAccessTokens> {
        if (!user.id) {
            throw new UnauthorizedException();
        }

        const activeUser = await this.authRepo.findUserById({ id: user.id });
        if (!activeUser) {
            throw new UnauthorizedException();
        }

        const { id, login, created_at, email, active } = activeUser;
        const { accessToken, refreshToken } = await this.getTokens({ id, login, created_at, email, active });
        
        return { accessToken, refreshToken };
    }
}
