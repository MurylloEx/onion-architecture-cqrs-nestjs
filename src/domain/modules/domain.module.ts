import { Module } from '@nestjs/common';

import { MessageModule } from 'src/domain/business';
import { EnvironmentModule } from 'src/domain/config';

@Module({
  imports: [
    MessageModule,
    EnvironmentModule
  ],
  exports: [
    MessageModule,
    EnvironmentModule
  ]
})
export class DomainModule {}
