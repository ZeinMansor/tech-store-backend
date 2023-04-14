import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard, IAuthGuard } from "@nestjs/passport";
import { User } from "../entities/user.entity";

@Injectable()
export class JwtAuthGuarg extends AuthGuard('jwt') implements IAuthGuard {

    public handleRequest(err: any, user: User): User | any {
        return user;
    }

    public async canActivate(context: ExecutionContext):  Promise<boolean> {
        await super.canActivate(context);

        const { user }: any = context.switchToHttp().getRequest();

        return user ? true : false;
    }

}