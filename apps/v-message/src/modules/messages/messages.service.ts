import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersHelper } from './messages.helper';
import { messageAnalysisDto } from '@libs/v-dto';
// import { UsersRepoService } from '../users-repo/users-repo.service';

@Injectable()
export class MessagesService {
    constructor(
        private configService: ConfigService,
        private messagesHelper : UsersHelper,
    ){}

    async receiveAnalysis(params: {
        id: string,
        analysis: messageAnalysisDto
    }):Promise<any>{
        
    }
}
