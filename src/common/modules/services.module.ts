import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain';
import { 
  ConfigurationService, 
  LoggingService, 
  MessageService, 
  UserService
} from 'src/common/services';

@Module({
  imports: [DomainModule],
  providers: [
    MessageService,
    ConfigurationService,
    LoggingService,
    UserService
  ],
  exports: [
    MessageService,
    ConfigurationService,
    LoggingService,
    UserService
  ]
})
export class ServicesModule {}
