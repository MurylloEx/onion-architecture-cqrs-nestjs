import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain';
import { ConfigurationService, LoggingService, MessageService } from 'src/common/services';

@Module({
  imports: [DomainModule],
  providers: [
    MessageService,
    ConfigurationService,
    LoggingService
  ],
  exports: [
    MessageService,
    ConfigurationService,
    LoggingService
  ]
})
export class ServicesModule {}
