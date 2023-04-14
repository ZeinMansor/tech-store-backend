
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import  * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthHelper {

    @InjectRepository(User)
    private readonly repository: Repository<User>;
    private readonly jwt: JwtService;

    constructor (_jwt: JwtService) {
        this.jwt = _jwt;
    }

    // Decode JWT
    public async decode(token: string): Promise<unknown> {
        return this.jwt.decode(token);
    }

    public async validateUser(decode: any): Promise<User> {
        return this.repository.findOne(decode.id);
    }

    // Generate token
    public generateToken(user: User): string {
        return this.jwt.sign({ id: user.id, email: user.email });
    }

    /**
     * Validate Password
     * @candidate password to test
     * @password hashed password retrived from db
     *  */ 
    public isValidPassword(candidate: string, password: string): boolean {
        return bcryptjs.compareSync(candidate, password);
    }

    public encodePassword(password: string): string {
        const salt = bcryptjs.genSaltSync(10);
        return bcryptjs.hashSync(password, salt);
    }

    public async validate(token: string): Promise<boolean | never> {
        const decoded: unknown = this.jwt.verify(token);
        
        if(!decoded) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        const user: User = await this.validateUser(decoded);

        if(!user) {
            throw new UnauthorizedException();
        }
        return true;
    }

}