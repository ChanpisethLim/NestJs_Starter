import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { signupDto, signinDto } from '../dtos/auth.dto';
import { User } from '../entities/user.entity';


@Injectable()
export class AuthService {
    constructor( @InjectRepository(User) private userRepository: Repository<User> ) {}

    async signup(data: signupDto) {
        const user = await this.userRepository.findOne({email: data.email})

        if(user){
            throw new ConflictException('Email already in use')
        }

        const newuser = this.userRepository.create(data)
        
        return await this.userRepository.save(newuser)
    }

    async signin(data: signinDto): Promise<User> {
        const user = await this.userRepository.findOne({email: data.email})

        if(!user) {
            throw new NotFoundException('User does not exist')
        }

        const validPassword = await user.validatePassword(data.password)

        if(!validPassword) {
            throw new UnauthorizedException('Incorrect password')
        }
        
        return user
    }

    signout(){}
}
