import { Module } from '@nestjs/common';
import { ConfigurationDomainModule } from 'src/domain';
import { ConfigurationService } from 'src/common/services';

@Module({
  imports: [ConfigurationDomainModule],
  providers: [ConfigurationService],
  exports: [ConfigurationService]
})
export class ConfigurationModule {}
