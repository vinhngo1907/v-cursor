import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './modules/messages/messages.module';
import { MessagesRepoModule } from './modules/messages-repo/messages-repo.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [
                // __dirname + '/../config/.env.prod',
                __dirname + '/../config/.env.dev',
            ],
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return { uri: configService.get<string>('MONGO_URI') }
            },
        }),
        MessagesModule,
        MessagesRepoModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
