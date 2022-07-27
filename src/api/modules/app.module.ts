import { Module } from '@nestjs/common';
import { AppService } from 'src/common/services';
import { AppController } from 'src/api/controllers';
import { EnvModule } from './env.module';

@Module({
  imports: [EnvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
