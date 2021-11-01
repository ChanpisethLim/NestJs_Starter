import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../services/user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
    constructor( private userService: UserService ) {}

    @Get()
    findAllUser() {
        return this.userService.findAll()
    }

    @Get('/email')
    findUserByEmail(@Query('email') email: string) {
        return this.userService.findByEmail(email)
    }
    
    @Get('/:id')
    findUserById(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
        return this.userService.findById(id)
    }
}
