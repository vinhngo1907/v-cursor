import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users-repo.schema';
import { Model } from 'mongoose';
import { saveAnalysisDto } from 'src/dto/index.dto';
import { userDto } from '@libs/v-dto';

@Injectable()
export class UsersRepoService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }
    async getUserDto(user: UserDocument | undefined): Promise<userDto | undefined> {
        if (user) {
            const {
                _id,
                login,
                password,
                salt,
                email,
                active,
                created_at,
                analysis,
            } = user;

            return {
                id: _id.toString(),
                login,
                password,
                salt,
                email,
                active,
                created_at,
                analysis,
            };
        }
    }
    async findById(param: { id: string }): Promise<userDto | undefined> {
        if (!param.id) {
            return;
        }

        const { id } = param;
        const user = await this.userModel.findOne({ _id: id });

        return this.getUserDto(user);
    }
    async saveAnalysis(param: saveAnalysisDto): Promise<any> {
        const { id, analysis, active } = param;
        await this.userModel.updateOne({ _id: id }, {
            $set: {
                analysis,
                ...(typeof active === "boolean" ? { active } : {})
            }
        })
    }

    /**
   * Find user by login
   */
    async findByLogin(param: { login: string }): Promise<userDto | undefined> {
        if (!param.login) {
            return;
        }

        const { login } = param;
        const user = await this.userModel.findOne({ login });

        return this.getUserDto(user);
    }
}
