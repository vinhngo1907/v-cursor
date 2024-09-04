import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db';

@Module({
	imports: [TypeOrmModule.forRoot(dbConfig), UsersModule, AuthModule],
	controllers: [],
	providers: [],
})
export class AppModule { }