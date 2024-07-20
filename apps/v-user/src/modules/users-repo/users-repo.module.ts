import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepoService } from './users-repo.service';
import { UsersSchema, User } from './users-repo.schema';

@Module({
    providers: [UsersRepoService],
    exports: [UsersRepoService],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }])
    ]
})
export class UsersRepoModule { }
