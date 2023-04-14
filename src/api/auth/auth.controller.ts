import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { LoginDto, RegisterDto } from './auth.dto';
import { JwtAuthGuarg } from './auth.gurad';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly authService: AuthService;

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    private register(@Body() body: RegisterDto): Promise<User | never> {
        return this.authService.register(body);
    }

    @Post('login')
    @UseInterceptors(ClassSerializerInterceptor)
    private login(@Body() body: LoginDto): Promise<User | never> {
        return this.authService.login(body);
    }

    @Post('refresh')
    @UseGuards(JwtAuthGuarg)
    private refresh(@Req() { user }: any): Promise<string | never> {
        return this.authService.refresh(<User> user);
    }
}
