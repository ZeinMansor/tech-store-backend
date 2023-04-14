import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { AuthHelper } from "./auth.helper";



@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {

    @Inject()
    private readonly authHelper: AuthHelper;

    constructor(@Inject(ConfigService) config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_KEY'),
            ignoreExpiration: true
        })
    }


    public validate(payload: string): Promise<boolean | never> {
        return this.authHelper.validate(payload);
    }
}