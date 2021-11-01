import { Body, ClassSerializerInterceptor, Controller, Get, Post, Res, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { signupDto, signinDto } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
    constructor( 
        private authService: AuthService, 
        private jwtService: JwtService
    ) {}

    @Post('/signup')
    signup(@Body() data: signupDto) {
        return this.authService.signup(data)
    }

    /* passthrough option determines whether the response will be sent manually within the route handler,
     * with the use of native response handling methods exposed by the platform-specific response object,
     * or if it should passthrough Nest response processing pipeline. */
    @Post('/signin')
    async signin(@Body() data: signinDto, @Res({passthrough: true}) res: Response) {
        const user = await this.authService.signin(data)
        
        const payload = {
            sub: user.id,
            name: user.name,
            isAdmin: user.isAdmin,
            iat: Date.now()
        }

        const access_token = this.jwtService.sign(payload)

        /* If not use passthrough option, the ClassSerializerInterceptor doesn't work because of Expressjs response which is a library specific approach, 
        so we need to destructuring response data */
        
        // const {password, isAdmin, ...other_data} = user

        res.cookie('access_token', access_token, {httpOnly: true, maxAge:  1 * 60 * 60 * 1000})
        return user
    }

    @Get('/signout')
    async signout(@Res({passthrough: true}) res: Response) {
        res.clearCookie('access_token')

        return {
            message: 'Successfully signout'
        }
    }
}
