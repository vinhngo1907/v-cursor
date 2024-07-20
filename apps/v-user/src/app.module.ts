import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersRepoModule } from './modules/users-repo/users-repo.module';


@Module({
  imports: [UsersRepoModule, UsersModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule { }
