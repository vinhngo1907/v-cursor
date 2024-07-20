import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersHelper } from './users.helper';
import { messageAnalysisDto, userAnalysisDto } from '@libs/v-dto';
import { UsersRepoService } from '../users-repo/users-repo.service';
import { saveAnalysisDto } from 'src/dto/index.dto';

@Injectable()
export class UsersService {
    constructor(
        private configService: ConfigService,
        private usersHelper: UsersHelper,
        private usersRepoService: UsersRepoService
    ) { }

    async receiveAnalysis(params: {
        id: string,
        analysis: messageAnalysisDto
    }): Promise<any> {
        const { id, analysis } = params;
        const user = await this.usersRepoService.findById({ id });
        if (!user) {
            return;
        }

        const newAnalysis: userAnalysisDto = [
            'spam',
            'toxic',
            'severe_toxic',
            'obscene',
            'threat',
            'insult',
            'identity_hate',
        ].reduce((acc, key) => {
            acc[key] = user.analysis?.[key] || 0;
            if (analysis[key]) {
                acc[key] += 1;
            }
            return acc;
        }, {});

        const violationLimit = this.configService.get<number>('VIOLATION_LIMIT');
        const violationCount = newAnalysis.toxic + newAnalysis.spam;
        const updateParam: saveAnalysisDto = {
            id: user.id,
            analysis: newAnalysis
        }

        if (violationCount > violationLimit) {
            updateParam.active = false;
        }

        await this.usersRepoService.saveAnalysis(updateParam);
    }
}
