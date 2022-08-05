import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationService } from 'src/common/services';

import { ConfigurationModule } from './configuration.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigurationService) => configService.configureTypeOrm(),
      inject: [ConfigurationService]
    })
  ]
})
export class DatabaseModule {}
