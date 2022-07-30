import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/modules';
import { DatabaseModule } from './database.module';
import { EnvironmentModule } from './environment.module';

@Module({
  imports: [
    EnvironmentModule,
    DomainModule,
    DatabaseModule
  ],
  exports: [
    EnvironmentModule,
    DomainModule,
    DatabaseModule
  ]
})
export class CommonModule {}
