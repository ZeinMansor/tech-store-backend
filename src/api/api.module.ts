import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [UserService]
})
export class ApiModule {}
