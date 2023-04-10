import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserController } from './controllers/user/user.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { TypeormService } from './services/typeorm/typeorm.service';
import { UserService } from './services/user/user.service';

@Module({
  imports: [UserModule],
  controllers: [UserController, AuthController],
  providers: [UserService, TypeormService]
})
export class ApiModule {}
