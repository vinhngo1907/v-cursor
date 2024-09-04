import { Injectable } from '@nestjs/common';
import { UsersCreateDto, UsersUpdateDto } from './users.dto';
import { User } from './users.entity';
import { Repository } from 'typeorm'; import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) { }

    async getUser(): Promise<User[]> {
        const users = await this.userRepository.find();

        return users;
    }

    async createUser(createUser: UsersCreateDto): Promise<User> {
        const newUser = await this.userRepository.create({
            ...createUser
        });
        return await this.userRepository.save(newUser);
    }

    async getAllUsers() {
        return this.userRepository.find({});
    }

    async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                id
            }
        });
        return user;
    }

    async deleteUserById(id: number): Promise<String> {
        try {
            await this.userRepository.delete(id);
            return "Deleted user in successfully";
        } catch (error) {
            console.log(error);
            return 'Delete User Failed';
        }
    }

    async updateUserById(id: number, usersUpdateDto: UsersUpdateDto) {
        const { name, age } = usersUpdateDto;
        const user = await this.userRepository.findOne({
            where: {
                id
            }
        });
        
        user.name = name;
        user.age = age;

        this.userRepository.save(user);

        return user;
    }
}
