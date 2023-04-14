import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { getEnvPath } from './common/helpers/env.helper';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from './api/services/typeorm/typeorm.service';

const envFilePath: string = getEnvPath(`${__dirname}/common/env`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    ApiModule,
    TypeOrmModule.forRootAsync({ useClass: TypeormService })
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
