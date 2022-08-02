import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain';
import { MessageDomainService } from 'src/common/services';

@Module({
  imports: [
    DomainModule
  ],
  providers: [
    MessageDomainService
  ],
  exports: [
    MessageDomainService
  ]
})
export class ServicesModule {}
