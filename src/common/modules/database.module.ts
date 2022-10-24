import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationService } from 'src/common/services';

import { ConfigurationModule } from './configuration.module';

const TypeOrmModuleAsync = TypeOrmModule.forRootAsync({
  imports: [ConfigurationModule],
  useFactory: (configService: ConfigurationService) => configService.configureTypeOrm(),
  inject: [ConfigurationService]
});

@Module({
  imports: [TypeOrmModuleAsync],
  exports: [TypeOrmModuleAsync]
})
export class DatabaseModule { }
