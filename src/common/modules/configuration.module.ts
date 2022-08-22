import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain';
import { ConfigurationService } from 'src/common/services';

@Module({
  imports: [DomainModule],
  providers: [ConfigurationService],
  exports: [ConfigurationService]
})
export class ConfigurationModule {}
