import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersRepoModule } from './modules/users-repo/users-repo.module';


@Module({
  imports: [UsersRepoModule, UsersModule, ConfigModule],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule { }
