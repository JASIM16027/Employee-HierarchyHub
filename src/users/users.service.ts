
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(userData: CreateUserDto): Promise<User> {
        console.log(userData)
        const user = await this.userRepository.create(userData);
        return await this.userRepository.save(user);

    }

    async findUserById(userId: number, authenticatedUserId: number): Promise<User> {
        this.isAuthenticated(userId, authenticatedUserId);

        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } });
    }


    private isAuthenticated(userId: number, authenticatedUserId: number): void {
        if (authenticatedUserId !== userId) {
            throw new UnauthorizedException('User is not authenticated');
        }
    }
}
