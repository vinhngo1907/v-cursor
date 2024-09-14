import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessagesModule } from './modules/messages/messages.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
		  envFilePath: [
			'config/.env',
		  ],
		  isGlobal: true,
		}),
		AuthModule,
		UsersModule,
		MessagesModule,
	  ],
})
export class AppModule { }