import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepo } from './auth.repo';
import { JwtStrategy } from 'src/infrastructure/jwt/strategy/jwt.strategy';
import { RefreshTokenStrategy } from 'src/infrastructure/jwt/strategy/jwt.refresh-strategy';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: {
					expiresIn: configService.get<string>('JWT_EXPIRES'),
				},
			}),
		}),
		HttpModule,
	],
	providers: [AuthService, ConfigService, AuthRepo, JwtStrategy, RefreshTokenStrategy],
	controllers: [AuthController],
	exports: [AuthService, JwtModule],
})
export class AuthModule { }
