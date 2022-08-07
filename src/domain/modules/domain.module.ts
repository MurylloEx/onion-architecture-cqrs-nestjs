import { Module } from '@nestjs/common';

import { BusinessDomainModule } from 'src/domain/business';
import { ConfigurationDomainModule } from 'src/domain/config';

@Module({
  imports: [
    BusinessDomainModule,
    ConfigurationDomainModule
  ],
  exports: [
    BusinessDomainModule,
    ConfigurationDomainModule
  ]
})
export class DomainModule {}
