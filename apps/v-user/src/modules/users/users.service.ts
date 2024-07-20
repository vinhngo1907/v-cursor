import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersHelper } from './users.helper';
import { messageAnalysisDto } from '@libs/v-dto';
import { UsersRepoService } from '../users-repo/users-repo.service';

@Injectable()
export class UsersService {
    constructor(
        private configService: ConfigService,
        private usersHelper : UsersHelper,
        private usersRepoService: UsersRepoService
    ){}

    async receiveAnalysis(params: {
        id: string,
        analysis: messageAnalysisDto
    }):Promise<any>{
        const {id, analysis} = params;
        // const user = await this
    }
}
