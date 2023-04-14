import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {

    @InjectRepository(User)
    private readonly repository: Repository<User>;


    @Inject(AuthHelper)
    private readonly authHelper: AuthHelper;


    public async register(body: RegisterDto): Promise<User | never> {
        const { email, name, password }: RegisterDto = body;

        let user: User = await this.repository.findOne({ where: { email } });

        if (user) {
            throw new HttpException('Conflict', HttpStatus.CONFLICT);
        }

        user = new User();
        user.name = name;
        user.email = email;
        user.lastLoginDate = new Date();
        user.password = this.authHelper.encodePassword(password);
        user.token = this.authHelper.generateToken(user);
        return this.repository.save(user);
    }


    public async login(body: LoginDto): Promise<User | never> {
        const { email, password }: LoginDto = body;

        const user: User = await this.repository.findOne({ where: { email } });

        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const isValidPassword: boolean = this.authHelper.isValidPassword(password, user.password);
        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        this.repository.update(user.id, { lastLoginDate: new Date() });
        user.token = this.authHelper.generateToken(user);
        return user;
    }

    public async refresh(user: User): Promise<string> {
        await this.repository.update(user.id, { lastLoginDate: new Date() });
        return this.authHelper.generateToken(user);
    }


}
