import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormService } from './services/typeorm/typeorm.service';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ApiModule, ],
  controllers: [AppController],
  providers: [AppService, TypeormService],
})
export class AppModule {}
