import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './modules/messages/messages.module';
import { MessagesRepoModule } from './modules/messages-repo/messages-repo.module';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [
                // __dirname + '/../config/.env.prod',
                `config/.env`,
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
    controllers: [],
    providers: [],
})
export class AppModule { }
