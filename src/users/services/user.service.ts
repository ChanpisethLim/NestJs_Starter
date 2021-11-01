import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor( @InjectRepository(User) private userRepository: Repository<User>){}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({email})

        if(!user){
            throw new NotFoundException('User does not exist')
        }

        return user
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOne(id)

        if(!user){
            throw new NotFoundException('User does not exist')
        }

        return user
    }
}
