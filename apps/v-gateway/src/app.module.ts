import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
	imports: [UsersModule, AuthModule, MessagesModule],
	controllers: [],
	providers: [],
})
export class AppModule { }