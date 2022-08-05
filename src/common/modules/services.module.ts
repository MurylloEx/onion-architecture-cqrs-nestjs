import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain';
import { ConfigurationService, MessageService } from 'src/common/services';

@Module({
  imports: [DomainModule],
  providers: [
    MessageService,
    ConfigurationService
  ],
  exports: [
    MessageService,
    ConfigurationService
  ]
})
export class ServicesModule {}
